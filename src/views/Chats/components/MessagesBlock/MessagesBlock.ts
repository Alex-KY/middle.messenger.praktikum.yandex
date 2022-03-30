import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

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
      <p class="messages-block__messages__date">{{ messages[0].date }}</p>
      {{ #each messages[0].messages }}
    </div>
    <form class="messages-block__footer" onsubmit="return false">
      {{ #each footer.components }}
    </div>
  `;
}

function generateTemplate() {
  const activeChat = store.getState('currentChat');
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
      user: string,
      components: string[]
  },
  messages: {
      date: string,
      messages: string[]
  }[],
  footer: {
      attachIcon: any,
      sendIcon: any,
      components: string[]
  }
};

export default class MessagesBlock extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign({}, props, { _state: 'currentChat' });

    super(concatProps);
  }

  render(): string {
    this.props.id = this.id;
    const tmpl = new Templator(generateTemplate());
    return tmpl.compile(this.props);
  }
};
