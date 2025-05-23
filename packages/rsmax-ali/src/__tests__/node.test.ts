import node from '../node';

describe('node', () => {
  it('meta', () => {
    const meta = node().meta!;

    expect(meta.ejs).toBeDefined();
    expect(meta.staticEjs).toBeDefined();
    expect(meta.template).toMatchInlineSnapshot(`
      {
        "extension": ".axml",
        "src": "src",
        "tag": "import",
      }
    `);
    expect(meta.style).toMatchInlineSnapshot(`".acss"`);
    expect(meta.jsHelper).toMatchInlineSnapshot(`
      {
        "extension": ".sjs",
        "src": "from",
        "tag": "import-sjs",
      }
    `);
  });
});
