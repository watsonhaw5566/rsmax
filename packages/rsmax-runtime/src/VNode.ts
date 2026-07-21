import { RuntimeOptions } from '@rsmax/framework-shared';
import type Container from './Container';
import { createCallbackProxy } from './SyntheticEvent/createCallbackProxy';
import { REMAX_METHOD, TYPE_TEXT } from './constants';
import propsAlias, { propAlias } from './propsAlias';

export interface RawNode {
  id: number;
  type: string;
  props?: any;
  nodes?: { [key: number]: RawNode };
  children?: Array<RawNode | number>;
  text?: string;
}

function toRawNode(node: VNode): RawNode {
  if (node.type === TYPE_TEXT) {
    return {
      id: node.id,
      type: node.type,
      text: node.text,
    };
  }

  return {
    id: node.id,
    type: node.type,
    props: propsAlias(node.props, node.type),
    children: [],
    text: node.text,
  };
}

function collectChildren(node: VNode): VNode[] {
  const arr: VNode[] = [];
  let item = node.firstChild;

  while (item) {
    arr.push(item);
    item = item.nextSibling;
  }

  return arr;
}

function toRawProps(prop: string, value: any, type: string) {
  return propAlias(prop, value, type);
}

function isAliPlatform(): boolean {
  return RuntimeOptions.get('platform') === 'ali';
}

export default class VNode {
  id: number;
  container: Container;
  mounted = false;
  deleted = false;
  type: string;
  props?: any;
  parent: VNode | null = null;
  firstChild: VNode | null = null;
  lastChild: VNode | null = null;
  size = 0;
  previousSibling: VNode | null = null;
  nextSibling: VNode | null = null;
  text?: string;
  callbackIds = new Set<string>();
  private _index = 0;
  private _path: string[] | null = null;
  private _mounted: boolean | null = null;
  private _callbackRegistry = new Map<string, { fn: any; id: string }>();

  constructor({ id, type, props, container }: { id: number; type: string; props?: any; container: any }) {
    this.id = id;
    this.container = container;
    this.type = type;
    this.props = props;
  }

  private invalidateCache() {
    this._path = null;
    this._mounted = null;
  }

  private updateIndicesFrom(startIndex: number) {
    let cur = this.childAtIndex(startIndex);
    while (cur) {
      cur._index = startIndex;
      cur.invalidateCache();
      startIndex += 1;
      cur = cur.nextSibling;
    }
  }

  private childAtIndex(index: number): VNode | null {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.firstChild;
    if (index === this.size - 1) return this.lastChild;
    let cur: VNode | null = this.firstChild;
    let i = 0;
    while (cur && i < index) {
      cur = cur.nextSibling;
      i += 1;
    }
    return cur;
  }

  appendChild(node: VNode) {
    this.removeChild(node);
    this.size += 1;

    node.parent = this;
    node.deleted = false;
    node._index = this.size - 1;
    node.invalidateCache();

    if (!this.firstChild) {
      this.firstChild = node;
    }

    if (this.lastChild) {
      this.lastChild.nextSibling = node;
      node.previousSibling = this.lastChild;
    }

    this.lastChild = node;

    if (this.isMounted()) {
      this.container.requestUpdate({
        type: 'splice',
        path: this.path,
        start: node._index,
        id: node.id,
        deleteCount: 0,
        children: this.children,
        items: [node.toJSON()],
        node: this,
      });
    }
  }

  removeChild(node: VNode) {
    const { previousSibling, nextSibling } = node;

    if (node.parent !== this) {
      return;
    }

    const index = node._index;
    this.size -= 1;

    if (this.firstChild === node) {
      this.firstChild = node.nextSibling;
    }

    if (this.lastChild === node) {
      this.lastChild = node.previousSibling;
    }

    if (previousSibling) {
      previousSibling.nextSibling = nextSibling;
    }

    if (nextSibling) {
      nextSibling.previousSibling = previousSibling;
    }

    node.previousSibling = null;
    node.nextSibling = null;
    node.deleted = true;
    node.parent = null;
    node.unregisteredCallbacks();

    this.updateIndicesFrom(index);

    if (this.isMounted()) {
      this.container.requestUpdate({
        type: 'splice',
        path: this.path,
        start: index,
        id: node.id,
        deleteCount: 1,
        children: this.children,
        items: [],
        node: this,
      });
    }
  }

  insertBefore(node: VNode, referenceNode: VNode) {
    this.removeChild(node);
    this.size += 1;

    node.parent = this;
    node.deleted = false;
    const targetIndex = referenceNode._index;
    node._index = targetIndex;
    node.invalidateCache();

    if (referenceNode === this.firstChild) {
      this.firstChild = node;
    }

    if (referenceNode.previousSibling) {
      referenceNode.previousSibling.nextSibling = node;
      node.previousSibling = referenceNode.previousSibling;
    }

    referenceNode.previousSibling = node;
    node.nextSibling = referenceNode;

    this.updateIndicesFrom(targetIndex + 1);

    if (this.isMounted()) {
      this.container.requestUpdate({
        type: 'splice',
        path: this.path,
        start: node._index,
        id: node.id,
        deleteCount: 0,
        children: this.children,
        items: [node.toJSON()],
        node: this,
      });
    }
  }

  update(payload?: any[]) {
    if (this.type === 'text' || !payload) {
      this.container.requestUpdate({
        type: 'splice',
        path: this.parent!.path,
        start: this._index,
        id: this.id,
        deleteCount: 1,
        items: [this.toJSON()],
        node: this,
      });

      return;
    }

    const parentPath = this.parent!.path;

    for (let i = 0; i < payload.length; i = i + 2) {
      const [propName, propValue] = toRawProps(payload[i], payload[i + 1], this.type);

      const path = isAliPlatform()
        ? [...parentPath, `children[${this._index}].props`]
        : [...parentPath, 'nodes', this.id.toString(), 'props'];

      this.container.requestUpdate({
        type: 'set',
        path,
        name: propName,
        value: propValue,
        node: this,
      });
    }
  }

  get index(): number {
    return this._index;
  }

  get children() {
    const arr: VNode[] = new Array(this.size);
    let item = this.firstChild;
    let i = 0;
    while (item) {
      arr[i++] = item;
      item = item.nextSibling;
    }
    return arr;
  }

  get path() {
    if (this._path) {
      return this._path;
    }
    if (!this.parent) {
      this._path = [];
      return this._path;
    }
    const parentPath = this.parent.path;
    let childPath: string[];
    if (isAliPlatform()) {
      childPath = [...parentPath, 'children', this._index.toString()];
    } else {
      childPath = [...parentPath, 'nodes', this.id.toString()];
    }
    this._path = childPath;
    return childPath;
  }

  isMounted(): boolean {
    if (this._mounted !== null) {
      return this._mounted;
    }
    const result = this.parent ? this.parent.isMounted() : this.mounted;
    this._mounted = result;
    return result;
  }

  isDeleted(): boolean {
    return this.deleted === true ? this.deleted : (this.parent?.isDeleted() ?? false);
  }

  registerCallback(propKey: string, propValue: any) {
    const id = `${REMAX_METHOD}_${this.id}_${propKey}`;
    const existing = this._callbackRegistry.get(propKey);
    if (existing) {
      if (existing.fn === propValue) {
        return existing.id;
      }
      this.container.removeCallback(existing.id);
      this.callbackIds.delete(existing.id);
    }
    this.callbackIds.add(id);
    this._callbackRegistry.set(propKey, { fn: propValue, id });
    this.container.createCallback(id, createCallbackProxy(propKey, this, propValue));
    return id;
  }

  unregisterCallback(propKey: string) {
    const entry = this._callbackRegistry.get(propKey);
    if (entry) {
      this.container.removeCallback(entry.id);
      this.callbackIds.delete(entry.id);
      this._callbackRegistry.delete(propKey);
    }
  }

  pruneCallbacks(keepKeys: Set<string>) {
    const toDelete: string[] = [];
    this._callbackRegistry.forEach((_entry, key) => {
      if (!keepKeys.has(key)) {
        toDelete.push(key);
      }
    });
    for (const key of toDelete) {
      this.unregisterCallback(key);
    }
  }

  unregisteredCallbacks() {
    this._callbackRegistry.forEach((_entry, key) => {
      this.unregisterCallback(key);
    });
  }

  toJSON() {
    const stack: Array<{
      currentNode: RawNode;
      children: VNode[];
    }> = [];
    const rawNode = toRawNode(this);
    const isAli = isAliPlatform();

    stack.push({
      currentNode: rawNode,
      children: collectChildren(this),
    });

    while (stack.length > 0) {
      const stackItem = stack.pop()!;
      const { children = [], currentNode } = stackItem;

      for (let i = 0; i < children.length; i++) {
        const currentVNode = children[i];
        const currentRawNode = toRawNode(currentVNode);

        if (isAli) {
          currentNode.children!.push(currentRawNode);
        } else {
          currentNode.children!.push(currentRawNode.id);
          if (!currentNode.nodes) {
            currentNode.nodes = {};
          }
          currentNode.nodes[currentRawNode.id] = currentRawNode;
        }

        if (currentVNode.firstChild) {
          stack.push({
            currentNode: currentRawNode,
            children: collectChildren(currentVNode),
          });
        }
      }
    }

    return rawNode;
  }
}
