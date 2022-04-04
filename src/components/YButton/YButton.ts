import Block from '../../utils/block';
import Templator from '../../utils/templater';

import './YButton.scss';

import { Props as Properties } from '../../utils/types';

interface Props extends Properties {
  click?: {
    fu?: (e: Event | string) => void,
    params?: string[]
  },
  title?: string,
  tagName?: string,
  class?: string,
  text?: string,
  textUnderline?: boolean,
  icon?: string,
  color?: string,
  width?: string
}

export default class YButton extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): string {
    const {click, tagName = 'button', title, class: classes, text, textUnderline, icon, color, width} = this.props;
    const template = `
      <${tagName}
        ${click ? `onclick="{{ click.fu }}(${click?.params || ''})"` : ``}
        ${title ? `title="${title}"` : ``}
        class="y-btn ${classes || ''} ${color ? `${color}-color` : ''} ${textUnderline ? `text--underline` : ''}"
        style="${width ? `width: ${width};` : ''}"
      >
        ${text || ''}
        ${icon || ''}
      </${tagName}>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
