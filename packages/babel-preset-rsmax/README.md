# babel-preset-rsmax

Babel preset for rsmax app.

```bash
  yarn add babel-preset-rsmax --dev
```

## Options

### react

configure react preset. https://babeljs.io/docs/en/babel-preset-react

```js
{
  presets: [
    [
      'rsmax',
      {
        react: {
          runtime: 'classic',
        },
        typescript: {
          allowNamespaces: true,
        },
        'class-properties': {
          loose: true,
        },
        decorators: {
          legacy: true,
        },
        'throw-if-namespace': false,
      },
    ],
  ];
}
```
