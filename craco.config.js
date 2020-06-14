const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#7d4cdb', '@link-color': '#7d4cdb' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
