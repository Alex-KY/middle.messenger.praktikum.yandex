import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import Properties from '../../../../utils/types';

import './Message.scss';

interface Props extends Properties {
  time: string,
  text?: string,
  image?: string,
  personal?: boolean
};

export default class Message extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  _computedClasses(props: Props) {
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

  render(): string {
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
