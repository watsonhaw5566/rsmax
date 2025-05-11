module.exports = function (api) {
  api.cache(true);

  return {
    plugins: ['loop-optimizer'],
    presets: [
      [
        'babel-preset-rsmax',
        {
          'class-properties': {
            loose: true,
          },
          decorators: {
            legacy: true,
          },
        },
      ],
    ],
  };
};
