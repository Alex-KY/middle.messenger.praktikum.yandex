const sass = require('node-sass');
const hook = require('css-modules-require-hook');
const { JSDOM } = require('jsdom');

hook({
    extensions: [ '.scss', '.css' ],
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    preprocessCss: data => sass.renderSync({ data }).css
})

const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`, { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;
