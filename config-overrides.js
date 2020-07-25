const path = require('path');
const fs = require('fs');
const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
// const AntDesignThemePlugin = require("../../index");
const { getLessVars } = require('antd-theme-generator');

const themeVariables = getLessVars(path.join(__dirname, './src/styles/vars.less'));
const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less');
const darkVars = { ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'), '@primary-color': defaultVars['@primary-color'] };
const lightVars = { ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'), '@primary-color': defaultVars['@primary-color'] };
fs.writeFileSync('./src/theme-dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/theme-light.json', JSON.stringify(lightVars));
fs.writeFileSync('./src/theme.json', JSON.stringify(themeVariables));

const options = {
  stylesDir: path.join(__dirname, './src'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  themeVariables: Array.from(new Set([...Object.keys(darkVars), ...Object.keys(lightVars), ...Object.keys(themeVariables)])),
  generateOnce: false, // generate color.less on each compilation
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  })
);
