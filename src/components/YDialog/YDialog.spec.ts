import { assert } from 'chai';

import YDialog from './YDialog';

console.log(YDialog)

describe('Тестирование компонента YDialog', () => {
  const props = {
    title: '',
    content: {
      template: `<div></div>`
    }
  };

  it('Инициализация YDialog', () => {
    const dialog = new YDialog(props).render() || '';

    console.log(dialog)

    assert.isString(dialog);
  });

});
