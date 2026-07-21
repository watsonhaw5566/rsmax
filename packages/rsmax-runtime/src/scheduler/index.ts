let taskQueue: Array<{
  callback: (timestamp: number) => void;
  id: number;
}> = [];
let taskIdCounter = 0;

export const unstable_now = Date.now;

export function unstable_scheduleCallback(callback: (timestamp: number) => void): number {
  const id = ++taskIdCounter;
  const task = { callback, id };
  taskQueue.push(task);

  queueMicrotask(() => {
    const index = taskQueue.findIndex(t => t.id === id);
    if (index !== -1) {
      taskQueue.splice(index, 1);
      callback(unstable_now());
    }
  });

  return id;
}

export function unstable_cancelCallback(id: number): void {
  const index = taskQueue.findIndex(t => t.id === id);
  if (index !== -1) {
    taskQueue.splice(index, 1);
  }
}

export function unstable_shouldYield(): boolean {
  return false;
}

export default {
  unstable_scheduleCallback,
  unstable_cancelCallback,
  unstable_shouldYield,
  unstable_now,
};
