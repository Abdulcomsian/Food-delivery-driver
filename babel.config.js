module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['.'],
        alias: {
          '@components': ['./src/components'],
          '@redux': ['./src/redux'],
          '@constants': ['./src/constants'],
          '@screens': ['./src/screens'],
          '@utils': ['./src/utils'],
          '@hooks': ['./src/Hooks'],
          '@navigatorHelper': ['./src/navigator/navigationHelper.ts'],
        },
      },
    ],
  ],
};
