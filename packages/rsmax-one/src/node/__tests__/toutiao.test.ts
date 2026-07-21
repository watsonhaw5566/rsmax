import node from '../toutiao';
import type { Meta } from '@rsmax/types';

describe('node toutiao', () => {
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
    expect(meta.jsHelper).toMatchInlineSnapshot(`{
  "extension": ".sjs",
  "src": "src",
  "tag": "sjs",
}`);
  });
});
