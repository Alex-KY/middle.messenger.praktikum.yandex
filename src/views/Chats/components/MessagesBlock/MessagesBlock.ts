import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import Message from '../Message/Message';

import store from '../../../../utils/store';

import { Props as Properties } from '../../../../utils/types';

import "./MessagesBlock.scss";

function emptyBlock() {
  return `
    <div class="messages-block__empty">
      {{ buttonAdd }}
      <span>{{ empty }}</span>
    </div>
  `;
}

function activeMessages() {
  const messages = store.getState('activeChatMessages');

  if (!messages) return '';

  return messages
    .map(message => new Message(message).render())
    .join('');
}

function activeChatBlock(title: string) {
  return `
    <div class="messages-block__header">
      <div class="user">
        <div class="user__avatar"></div>
        <div class="user__name">${ title }</div>
      </div>
      {{ #each header.components }}
    </div>
    <div class="messages-block__messages">
      ${ activeMessages() }
    </div>
    <form class="messages-block__footer" onsubmit="{{ footer.fnSubmit }}(event)">
      {{ #each footer.components }}
    </form>
  `;
}

function generateTemplate() {
  const activeChat = store.getState('activeChat');
  let body = '';

  if (!activeChat) {
    body = emptyBlock();
  } else {
    const chats = store.getState('chats');
    const title = chats.find(({ id }) => id === activeChat.id).title;
    body = activeChatBlock(title);
  }

  return `
    <div id={{ id }} class="messages-block">
      ${body}
    </div>
  `;
}

interface Props extends Properties {
  empty: string,
  header: {
      components: string[]
  },
  footer: {
      attachIcon: string,
      sendIcon: string,
      components: string[],
      fnSubmit: void
  }
}

export default class MessagesBlock extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign({}, props, { _state: ['activeChat', 'activeChatMessages'] });

    super(concatProps);
  }

  render(): string {
    this.props.id = this.id;
    const tmpl = new Templator(generateTemplate());
    return tmpl.compile(this.props);
  }
}
