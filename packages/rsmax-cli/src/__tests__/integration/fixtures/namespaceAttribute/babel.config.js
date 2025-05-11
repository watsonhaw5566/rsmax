module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-rsmax',
        {
          'throw-if-namespace': false,
        },
      ],
    ],
  };
};
