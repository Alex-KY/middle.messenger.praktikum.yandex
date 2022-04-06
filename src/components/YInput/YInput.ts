import Block from '../../utils/block';
import Templator from '../../utils/templater';

import './YInput.scss';

import { Props as Properties } from '../../utils/types';

interface Props extends Properties {
  focus?: {
    callback: (e: Event) => void,
    params: string[]
  },
  blur?: {
    callback: (e: Event) => void,
    params: string[]
  },
  input?: {
    callback: (e: Event) => void,
    params: string[]
  },
  change?: {
    callback: (e: Event) => void,
    params: string[]
  },
  type?: string,
  accept?: string,
  name?: string,
  label?: string,
  placeholder?: string,
  pattern?: string,
  required?: boolean,
  class?: string,
  errorText?: string,
  hideDetails?: boolean,
  value?: string
}

export default class YInput extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }
  errorText = 'Введите корректные данные';

  render(): string {
    const { focus, blur, input, change, type, accept, name, label, placeholder, pattern, required, class: classes, errorText = this.errorText, hideDetails = false, value } = this.props;
    const template = `
      <div class="y-input ${hideDetails ? 'y-input--hide-details ': ''}${classes || ''}">
        <input
          ${focus ? `onfocus="{{ focus.callback }}(${focus?.params || ''})"` : ``}
          ${blur ? `onblur="{{ blur.callback }}(${blur?.params || ''})"` : ``}
          ${input ? `oninput="{{ input.callback }}(${input?.params || ''})"` : ``}
          ${change ? `onchange="{{ change.callback }}(${change?.params || ''})"` : ``}
          type="${type || 'text'}"
          ${accept ? `accept="${accept}"` : ``}
          ${name ? `name="${name}"` : ``}
          ${pattern ? `pattern="${pattern}"` : ``}
          ${placeholder ? `placeholder="${placeholder}"` : ``}
          ${required ? `required` : ``}
          class="y-input__input"
          ${value ? `value="${value}"` : ``}
        >
        ${label ? `<label class="y-label ${value ? `y-label--active` : ``}">${label}</label>` : ''}
        ${hideDetails ? '' : `<div class="y-input__details error-text">${errorText}</div>`}
      </div>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
