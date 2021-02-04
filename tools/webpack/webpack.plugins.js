// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

// https://stackoverflow.com/questions/44008674/how-to-import-the-electron-ipcrenderer-in-a-react-webpack-2-setup
const webpack = require('webpack');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ExternalsPlugin('commonjs', [
    'electron'
  ]),
  new webpack.ExternalsPlugin("commonjs", [
    'leveldown'
  ]),
  new CopyPlugin({
    patterns: [
      { from: 'node_modules/leveldown/prebuilds/linux-x64', to: 'prebuilds/linux-x64' },
    ],
  }),
];
