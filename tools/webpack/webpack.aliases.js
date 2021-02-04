// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createWebpackAliases } = require('./webpack.helpers');

// Webpack aliases to resolve
const aliases = createWebpackAliases({
  '@src': 'src',
  '@app': 'src/app',
  '@static': 'src/static',
  'jsonfile': './node_modules/fs-extra/node_modules/jsonfile',
  'nanoid/random': './node_modules/nanoid',
  'nanoid/format': './node_modules/nanoid'
});

// Export aliases
module.exports = aliases;
