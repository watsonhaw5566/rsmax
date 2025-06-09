// vitest.setup.js
import { expect } from 'vitest';

// 配置快照序列化器，确保跨平台一致性
expect.addSnapshotSerializer({
  test: (val) => val && typeof val === 'string',
  print: (val) => {
    // 统一行尾符为 LF
    return JSON.stringify(val.replace(/\r\n/g, '\n'));
  },
});

// 为 SVG 元素添加特殊处理
expect.addSnapshotSerializer({
  test: (val) => val && val.tagName === 'svg',
  print: (val, serialize) => {
    // 确保 SVG 属性的顺序一致
    const attributes = Array.from(val.attributes)
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {});

    // 创建一个新的对象来序列化
    const serializable = {
      type: 'svg',
      attributes,
      children: Array.from(val.childNodes).map(node => {
        if (node.nodeType === 3) { // 文本节点
          return node.textContent;
        }
        return node;
      }),
    };

    return serialize(serializable);
  },
});
