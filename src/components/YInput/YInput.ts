import Block from '../../utils/block';
import Templator from '../../utils/templater';

import './YInput.scss';

export default class YInput extends Block {
  constructor(props: any) {
    super(props);
  }
  errorText = 'Введите корректные данные';

  render(): any {
    const { focus, blur, input, type, name, label, placeholder, pattern, required, class: classes, errorText = this.errorText, hideDetails = false } = this.props;
    const template = `
      <div class="y-input ${hideDetails ? 'y-input--hide-details ': ''}${classes || ''}">
        <input
          ${focus ? `onfocus="{{ focus.fu }}(${focus?.params || ''})"` : ``}
          ${blur ? `onblur="{{ blur.fu }}(${blur?.params || ''})"` : ``}
          ${input ? `oninput="{{ input.fu }}(${input?.params || ''})"` : ``}
          type="${type || 'text'}"
          ${name ? `name="${name}"` : ``}
          ${pattern ? `pattern="${pattern}"` : ``}
          ${placeholder ? `placeholder="${placeholder}"` : ``}
          ${required ? `required` : ``}
          class="y-input__input"
        >
        ${label ? `<label class="y-label">${label}</label>` : ''}
        ${hideDetails ? '' : `<div class="y-input__details error-text">${errorText}</div>`}
      </div>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
