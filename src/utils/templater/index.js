import get from "./utils/get.js";
import { nanoid } from 'nanoid';

export default class Templator {
  PRECOMPILE_REGEXP = /\{\{\s?#(each)(.*?)\}\}/gi;
  COMPILE_REGEXP = /\{\{(.*?)\}\}/gi;
  SPEC_SYMBOLS_REGEXP = /\[|\]/g;

  constructor(template) {
    this._template = template;
  }

  compile(ctx) {
    this._precompileTemplate(ctx);
    return this._compileTemplate(ctx);
  }

  _precompileTemplate(ctx) {
    let tmpl = this._template;
    let key = null;
    const regExp = this.PRECOMPILE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[2]) {
        const tmplValue = key[2].trim();
        const tmplKey = key[0]
          .split('')
          .map(char => char.match(this.SPEC_SYMBOLS_REGEXP) ? `\\${char}` : char)
          .join('');

        const data = get(ctx, tmplValue);

        if (Array.isArray(data)) {
          let tmplData = '';

          for (let i = 0; i < data.length; i++) {
            tmplData += `${data[i]}`;
          }

          tmpl = tmpl.replace(new RegExp(tmplKey, "gi"), tmplData || data);

          continue;
        }

        tmpl = tmpl.replace(new RegExp(tmplKey, "gi"), data);
      }
    }

    this._template = tmpl;
  }

  _compileTemplate(ctx) {
    let tmpl = this._template;
    let key = null;
    const regExp = this.COMPILE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const tmplKey = key[0]
          .split('')
          .map(char => char.match(this.SPEC_SYMBOLS_REGEXP) ? `\\${char}` : char)
          .join('');

        const data = get(ctx, tmplValue);

        if (typeof data === "function") {
          const id = nanoid(6);
          window[`${tmplValue}-${id}`] = data;
          tmpl = tmpl.replace(
            new RegExp(tmplKey, "gi"),
            `window['${tmplValue}-${id}']`
          );
          continue;
        }

        tmpl = tmpl.replace(new RegExp(tmplKey, "gi"), data);
      }
    }

    return tmpl;
  }
}
