module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js', '.json', '.svg', '.ttf'],
          alias: {
            '@common': './src/common',
            '@constants': './src/constants',
            '@features': './src/features',
            '@navigation': './src/navigation',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
