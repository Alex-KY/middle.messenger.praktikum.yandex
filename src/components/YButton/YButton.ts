import Block from '../../utils/block';
import Templator from '../../utils/templater';
import './YButton.scss';

export default class YButton extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const { click, blur, tagName } = this.props;
    const template = `
      <${tagName || 'button'}
        ${click ? `onclick="{{ click.fu }}(${click?.params || ''})"` : ``}
        ${blur ? `onblur="{{ blur.fu }}(${blur?.params || ''})"` : ``}
        class="y-btn {{ class }}"
      >
        {{ text }}
      </${tagName || 'button'}>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
