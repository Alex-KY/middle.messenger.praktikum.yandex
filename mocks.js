const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><div id="root"></div>`, { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;
