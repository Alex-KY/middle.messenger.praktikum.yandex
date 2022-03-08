import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import './Message.scss';

export default class Message extends Block {
  constructor(props: any) {
    super(props);
  }

  _computedClasses(props) {
    const { text, image, personal } = props
    let classes = [];

    if (text && !image) {
      classes.push('message--text');
    }

    if (!text && image) {
      classes.push('message--image');
    }
    if (personal) {
      classes.push('message--personal');
    }

    return classes.join(' ');
  }

  render(): any {
    const { time, text, image } = this.props;
    const classes = this._computedClasses(this.props)
    const template = `
      <div class="message ${classes}">
        ${ text || '' }
        ${ image || '' }
        <span class="message__time">${ time || '' }</span>
      </div>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
