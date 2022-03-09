import get from "./utils/get";
import { nanoid } from 'nanoid';

interface Properties {

};

export default class Templator<Props extends Properties> {
  PRECOMPILE_REGEXP = /\{\{\s?#(each)(.*?)\}\}/gi;
  COMPILE_REGEXP = /\{\{(.*?)\}\}/gi;
  SPEC_SYMBOLS_REGEXP = /\[|\]/g;

  _template;

  constructor(template: Props) {
    this._template = template;
  }

  compile(ctx: Props): string {
    this._precompileTemplate(ctx);
    return this._compileTemplate(ctx);
  }

  _precompileTemplate(ctx: Props) {
    let tmpl: any = this._template;
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

  _compileTemplate(ctx: Props) {
    let tmpl: any = this._template;
    let key = null;
    const regExp = this.COMPILE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue: string = key[1].trim();
        const tmplKey = key[0]
          .split('')
          .map(char => char.match(this.SPEC_SYMBOLS_REGEXP) ? `\\${char}` : char)
          .join('');

        const data = get(ctx, tmplValue);

        if (typeof data === "function") {
          const id: string = nanoid(6);
          const key: any = `${tmplValue}-${id}`;
          window[key] = data;
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
