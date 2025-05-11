import node from '../node';
import type { Meta } from '@rsmax/types';

describe('node', () => {
  it('meta', () => {
    const meta = node().meta as Meta;
    expect(meta.ejs).toBeDefined();
    expect(meta.template).toMatchInlineSnapshot(`
      {
        "extension": ".wxml",
        "src": "src",
        "tag": "import",
      }
    `);
    expect(meta.style).toMatchInlineSnapshot(`".wxss"`);
    expect(meta.jsHelper).toMatchInlineSnapshot(`
      {
        "extension": ".wxs",
        "src": "src",
        "tag": "wxs",
      }
    `);
  });
});
