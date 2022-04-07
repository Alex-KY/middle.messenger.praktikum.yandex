import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import store from '../../../../utils/store';

import { messageTime, datetime } from '../../../../utils/helpers';

import { Props as Properties } from '../../../../utils/types';

import './Message.scss';

interface Props extends Properties {
  time: string,
  content?: string,
  file?: string,
  user_id?: number
}

export default class Message extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  _computedClasses(props: Props) {
    const { content, file, user_id: userId } = props;
    const id = store.getState('userData')?.id;
    const isMine = id === userId;

    const classes = [];

    if (content && !file) {
      classes.push('message--text');
    }

    if (!content && file) {
      classes.push('message--image');
    }

    if (isMine) {
      classes.push('message--mine');
    }

    return classes.join(' ');
  }

  render(): string {
    const { time, content, file } = this.props;
    const classes = this._computedClasses(this.props);
    const template = `
      <div class="message ${classes}">
        ${ content || '' }
        ${ file || '' }
        <span class="message__time" title="${datetime(time)}">${ messageTime(time) }</span>
      </div>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
