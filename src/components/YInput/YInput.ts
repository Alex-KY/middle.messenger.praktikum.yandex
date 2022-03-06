import Block from '../../utils/block';
import Templator from '../../utils/templater';
import './YInput.scss';

export default class YInput extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const { focus, blur, input, type, name, placeholder, pattern, required, class: classes } = this.props;
    const template = `
      <input
        ${focus ? `onfocus="{{ focus.fu }}(${focus?.params || ''})"` : ``}
        ${blur ? `onblur="{{ blur.fu }}(${blur?.params || ''})"` : ``}
        ${input ? `oninput="{{ input.fu }}(${input?.params || ''})"` : ``}
        type="${type || 'text'}"
        ${name ? `name="${name}"` : ``}
        ${pattern ? `pattern="${pattern}"` : ``}
        ${placeholder ? `placeholder="${placeholder}"` : ``}
        ${required ? `required` : ``}
        class="y-input ${ classes || '' }"
      >
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
