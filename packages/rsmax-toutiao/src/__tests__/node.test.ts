import node from '../node';
import type { Meta } from '@rsmax/types';

describe('node', () => {
  it('meta', () => {
    const meta = node().meta as Meta;
    expect(meta.ejs).toBeDefined();
    expect(meta.template).toMatchInlineSnapshot(`
      {
        "extension": ".ttml",
        "src": "src",
        "tag": "import",
      }
    `);
    expect(meta.style).toMatchInlineSnapshot(`".ttss"`);
    expect(meta.jsHelper).toMatchInlineSnapshot(`undefined`);
  });
});
