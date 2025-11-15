import { RuntimeOptions } from '@rsmax/framework-shared';
import type { FiberRoot } from 'react-reconciler';
import VNode, { type RawNode } from './VNode';
import { unstable_batchedUpdates } from './index';
import { generate } from './instanceId';
import nativeEffector from './nativeEffect';

interface SpliceUpdate {
  path: string[];
  start: number;
  id: number;
  deleteCount: number;
  items: RawNode[];
  children?: RawNode[];
  type: 'splice';
  node: VNode;
}

interface SetUpdate {
  path: string[];
  name: string;
  value: any;
  type: 'set';
  node: VNode;
}

export default class Container {
  context: any;
  root: VNode;
  rootKey: string;
  updateQueue: Array<SpliceUpdate | SetUpdate> = [];
  _rootContainer?: FiberRoot;
  stopUpdate?: boolean;
  rendered = false;

  constructor(context: any, rootKey = 'root') {
    this.context = context;

    this.root = new VNode({
      id: generate(),
      type: 'root',
      container: this,
    });
    this.root.mounted = true;
    this.rootKey = rootKey;
  }

  requestUpdate(update: SpliceUpdate | SetUpdate) {
    this.updateQueue.push(update);
  }

  normalizeUpdatePath(paths: string[]) {
    return [this.rootKey, ...paths].join('.');
  }

  applyUpdate() {
    if (this.stopUpdate || this.updateQueue.length === 0) {
      return;
    }

    const startTime = new Date().getTime();

    if (typeof this.context.$spliceData === 'function') {
      let $batchedUpdates = (callback: () => void) => {
        callback();
      };

      if (typeof this.context.$batchedUpdates === 'function') {
        $batchedUpdates = this.context.$batchedUpdates;
      }

      $batchedUpdates(() => {
        if (RuntimeOptions.get('mergeSpliceData')) {
          const splicePayload: Record<string, any[]> = {};
          const setPayload: Record<string, any> = {};

          this.updateQueue.forEach(update => {
            if (update.type === 'splice') {
              splicePayload[this.normalizeUpdatePath([...update.path, 'children'])] = [
                update.start,
                update.deleteCount,
                ...update.items,
              ];
            } else if (update.type === 'set') {
              setPayload[this.normalizeUpdatePath([...update.path, update.name])] = update.value;
            }
          });

          const hasSplice = Object.keys(splicePayload).length > 0;
          const hasSet = Object.keys(setPayload).length > 0;
          const total = (hasSplice ? 1 : 0) + (hasSet ? 1 : 0);
          let done = 0;
          const doneCallback = () => {
            done += 1;
            if (done === total) {
              nativeEffector.run();
              /* istanbul ignore next */
              if (RuntimeOptions.get('debug')) {
                console.log(`setData => 回调时间：${new Date().getTime() - startTime}ms`);
              }
            }
          };

          if (hasSplice) {
            this.context.$spliceData(splicePayload, doneCallback);
          }
          if (hasSet) {
            this.context.setData(setPayload, doneCallback);
          }
        } else {
          this.updateQueue.map((update, index) => {
            let callback = undefined;
            if (index + 1 === this.updateQueue.length) {
              callback = () => {
                nativeEffector.run();
                /* istanbul ignore next */
                if (RuntimeOptions.get('debug')) {
                  console.log(`setData => 回调时间：${new Date().getTime() - startTime}ms`);
                }
              };
            }

            if (update.type === 'splice') {
              this.context.$spliceData(
                {
                  [this.normalizeUpdatePath([...update.path, 'children'])]: [
                    update.start,
                    update.deleteCount,
                    ...update.items,
                  ],
                },
                callback
              );
            }

            if (update.type === 'set') {
              this.context.setData(
                {
                  [this.normalizeUpdatePath([...update.path, update.name])]: update.value,
                },
                callback
              );
            }
          });
        }
      });

      this.updateQueue = [];

      return;
    }

    const updatePayload = this.updateQueue.reduce<{ [key: string]: any }>((acc, update) => {
      if (update.node.isDeleted()) {
        return acc;
      }
      if (update.type === 'splice') {
        acc[this.normalizeUpdatePath([...update.path, 'nodes', update.id.toString()])] = update.items[0] || null;

        if (update.children) {
          acc[this.normalizeUpdatePath([...update.path, 'children'])] = (update.children || []).map(c => c.id);
        }
      } else {
        acc[this.normalizeUpdatePath([...update.path, update.name])] = update.value;
      }
      return acc;
    }, {});

    const chunkSize = RuntimeOptions.get('setDataChunkSize');
    const entries = Object.entries(updatePayload);

    if (chunkSize && chunkSize > 0 && entries.length > chunkSize) {
      for (let i = 0; i < entries.length; i += chunkSize) {
        const slice = entries.slice(i, i + chunkSize);
        const payloadChunk = Object.fromEntries(slice);
        const isLast = i + chunkSize >= entries.length;
        this.context.setData(payloadChunk, () => {
          if (isLast) {
            nativeEffector.run();
            /* istanbul ignore next */
            if (RuntimeOptions.get('debug')) {
              console.log(`setData => 回调时间：${new Date().getTime() - startTime}ms`, payloadChunk);
            }
          }
        });
      }
    } else {
      this.context.setData(updatePayload, () => {
        nativeEffector.run();
        /* istanbul ignore next */
        if (RuntimeOptions.get('debug')) {
          console.log(`setData => 回调时间：${new Date().getTime() - startTime}ms`, updatePayload);
        }
      });
    }

    this.updateQueue = [];
  }

  clearUpdate() {
    this.stopUpdate = true;
  }

  createCallback(name: string, fn: (...params: any) => any) {
    this.context[name] = (...args: any) => {
      return unstable_batchedUpdates(args => {
        return fn(...args);
      }, args);
    };
  }

  removeCallback(name: string) {
    delete this.context[name];
  }

  appendChild(child: VNode) {
    this.root.appendChild(child);
  }

  removeChild(child: VNode) {
    this.root.removeChild(child);
  }

  insertBefore(child: VNode, beforeChild: VNode) {
    this.root.insertBefore(child, beforeChild);
  }
}
