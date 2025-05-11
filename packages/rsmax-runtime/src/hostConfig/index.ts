import scheduler from 'scheduler';
import { TYPE_TEXT } from '../constants';
import { generate } from '../instanceId';
import VNode from '../VNode';
import Container from '../Container';
import diffProperties from './diffProperties';

const {
  unstable_scheduleCallback: scheduleDeferredCallback,
  unstable_cancelCallback: cancelDeferredCallback,
  unstable_shouldYield: shouldYield,
  unstable_now: now,
} = scheduler;

const DOM_TAG_MAP: { [name: string]: string } = {
  span: 'text',
  div: 'view',
  img: 'image',
};

function processProps(newProps: any, node: VNode) {
  const props: any = {};
  node.unregisteredCallbacks();
  for (const propKey of Object.keys(newProps)) {
    if (typeof newProps[propKey] === 'function') {
      props[propKey] = node.registerCallback(propKey, newProps[propKey]);
    } else if (propKey === 'style') {
      props[propKey] = newProps[propKey] || '';
    } else if (propKey === 'children') {
      // pass
    } else {
      props[propKey] = newProps[propKey];
    }
  }

  return props;
}

const rootHostContext = {};
const childHostContext = {};

export default {
  now,

  getPublicInstance: <T>(inst: T): T => {
    return inst;
  },

  getRootHostContext: () => {
    return rootHostContext;
  },

  shouldSetTextContent(type: string) {
    return type === 'stub-block';
  },

  prepareForCommit: () => {
    return null;
  },

  preparePortalMount: () => {
    // nothing to do
  },

  clearContainer: () => {
    // nothing to do
  },

  resetAfterCommit: (container: Container) => {
    container.applyUpdate();
  },

  getChildHostContext: () => {
    return childHostContext;
  },

  createInstance(type: string, newProps: any, container: Container) {
    const id = generate();
    const node = new VNode({
      id,
      type: DOM_TAG_MAP[type] ?? type,
      props: {},
      container,
    });
    node.props = processProps(newProps, node);

    return node;
  },

  createTextInstance(text: string, container: Container) {
    const id = generate();
    const node = new VNode({
      id,
      type: TYPE_TEXT,
      props: null,
      container,
    });
    node.text = text;
    return node;
  },

  commitTextUpdate(node: VNode, oldText: string, newText: string) {
    if (oldText !== newText) {
      node.text = newText;
      node.update();
    }
  },

  prepareUpdate(node: VNode, type: string, lastProps: any, nextProps: any) {
    lastProps = processProps(lastProps, node);
    nextProps = processProps(nextProps, node);

    return diffProperties(lastProps, nextProps);
  },

  commitUpdate(node: VNode, updatePayload: any, type: string, oldProps: any, newProps: any) {
    node.props = processProps(newProps, node);
    node.update(updatePayload);
  },

  appendInitialChild: (parent: VNode, child: VNode) => {
    parent.appendChild(child);
  },

  appendChild(parent: VNode, child: VNode) {
    parent.appendChild(child);
  },

  insertBefore(parent: VNode, child: VNode, beforeChild: VNode) {
    parent.insertBefore(child, beforeChild);
  },

  removeChild(parent: VNode, child: VNode) {
    parent.removeChild(child);
  },

  finalizeInitialChildren: () => {
    return false;
  },

  appendChildToContainer(container: any, child: VNode) {
    container.appendChild(child);
    child.mounted = true;
  },

  insertInContainerBefore(container: any, child: VNode, beforeChild: VNode) {
    container.insertBefore(child, beforeChild);
  },

  removeChildFromContainer(container: any, child: VNode) {
    container.removeChild(child);
  },

  hideInstance(instance: VNode) {
    const originStyle = instance.props?.style;
    const newStyle = Object.assign({}, originStyle || {}, { display: 'none' }); // 微信和阿里的小程序都不支持在内联样式中加`important!`
    instance.props = Object.assign({}, instance.props || {}, { style: newStyle });
    instance.update();
  },

  hideTextInstance(instance: VNode) {
    instance.text = '';
    instance.update();
  },

  unhideInstance(instance: VNode, props: any) {
    instance.props = props;
    instance.update();
  },

  unhideTextInstance(instance: VNode, text: string) {
    instance.text = text;
    instance.update();
  },

  /**
   * 当 fiber 被标记为 Deletion 时，dom被卸载后，从dom节点上删除 react 初始化的内容，如 __reactProps$xxxx 等. 详见React源码
   * https://github.com/facebook/react/blob/8b31835fc0a4de479a816471764f0e1d103ae205/packages/react-reconciler/src/forks/ReactFiberConfig.custom.js#L78
   */
  detachDeletedInstance() {
    return {};
  },

  schedulePassiveEffects: scheduleDeferredCallback,
  cancelPassiveEffects: cancelDeferredCallback,
  shouldYield,
  scheduleDeferredCallback,
  cancelDeferredCallback,

  supportsMutation: true,
};
