import node from '../node';
import type { Meta } from '@rsmax/types';

describe('node', () => {
  it('meta', () => {
    const meta = node().meta as Meta;
    expect(meta.ejs).toBeDefined();
    expect(meta.template).toMatchInlineSnapshot(`
      {
        "extension": ".xhsml",
        "src": "src",
        "tag": "import",
      }
    `);
    expect(meta.style).toMatchInlineSnapshot(`".css"`);
    expect(meta.jsHelper).toMatchInlineSnapshot(`{
  "extension": ".sjs",
  "src": "src",
  "tag": "sjs",
}`);
  });
});
