import Block from '../../utils/block';
import Templator from '../../utils/templater';

import './YButton.scss';

import Properties from '../../utils/types';

interface Props extends Properties {
  click?: {
    fu?: (event: PointerEvent | string) => void,
    params?: string[]
  },
  tagName?: string,
  class?: string,
  text?: string,
  icon?: string,
  color?: string
};

export default class YButton extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): string {
    const { click, tagName = 'button', class: classes, text, icon, color } = this.props;
    const template = `
      <${tagName}
        ${click ? `onclick="{{ click.fu }}(${click?.params || ''})"` : ``}
        class="y-btn ${ classes || '' } ${ color ? `${color}-color` : '' }"
      >
        ${ text || '' }
        ${ icon || '' }
      </${tagName}>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
