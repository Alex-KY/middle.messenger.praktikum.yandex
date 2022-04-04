import { assert } from 'chai';

import Templator from '.';

describe('Тестирование шаблонизатора', () => {
  const props = {
    a: 1,
    b: {
      c: 2,
      d: [3, 4, 5]
    }
  };

  it('Переменная { a: 1 } === "1"', () => {
    const template = `{{ a }}`;
    const tmpl = new Templator(template);

    assert.isTrue(tmpl.compile(props) === '1');
  });

  it('Вложенная переменная { b: { c: 2 }} === "2"', () => {
    const template = `{{ b.c }}`;
    const tmpl = new Templator(template);

    assert.isTrue(tmpl.compile(props) === '2');
  });

  it('Вложенный массив { d: [ 3, 4, 5 ] } === "345"', () => {
    const template = `{{ #each b.d }}`;
    const tmpl = new Templator(template);

    assert.isTrue(tmpl.compile(props) === '345');
  });

});
