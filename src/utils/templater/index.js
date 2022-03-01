import get from "./utils/get.js"

export default class Templator {
  TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
  SPEC_SYMBOLS_REGEXP = /\[|\]/g;

  constructor(template) {
    this._template = template;
  }

  compile(ctx) {
    return this._compileTemplate(ctx);
  }

  _compileTemplate(ctx) {
    let tmpl = this._template;
    let key = null;
    const regExp = this.TEMPLATE_REGEXP;

    // Важно делать exec именно через константу, иначе уйдёте в бесконечный цикл
    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim()
        const tmplKey = key[0]
          .split('')
          .map(char => char.match(this.SPEC_SYMBOLS_REGEXP) ? `\\${char}` : char)
          .join('');

        // get — функция, написанная ранее в уроке
        const data = get(ctx, tmplValue);

        if (typeof data === "function") {
          window[tmplValue] = data;
          tmpl = tmpl.replace(
            new RegExp(tmplKey, "gi"),
            `window.${key[1].trim()}()`
          );
          continue;
        }

        tmpl = tmpl.replace(new RegExp(tmplKey, "gi"), data);
      }
    }

    return tmpl;
  }
}
