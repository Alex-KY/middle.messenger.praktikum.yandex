import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import ChatsController from '../../../../controllers/ChatsController';
import MessagesController from '../../../../controllers/MessagesController';

import store from '../../../../utils/store';

import { lastMessageDate } from '../../../../utils/helpers';

import { baseResourcesApiUrl } from '../../../../utils/HTTPTransport';

import { Props as Properties } from '../../../../utils/types';

import "./LeftSide.scss";


interface Props extends Properties {
  button: string,
  inputs: {
      name: string,
      placeholder: string
  }[]
};

const chatsController = new ChatsController();

function openChat(id: number) {
  const activeChatId = store.getState('activeChat')?.id;

  if (activeChatId) {
    store.set('activeChat', null);
  }

  store.set('activeChat', { id });

  chatsController.fetchChats();

  MessagesController.openWSS();
}

function generateTemplate() {
  const state = store.getState('chats') || [];
  const activeChat = store.getState('activeChat');

  const chats = state.map((chat: any) => {
    const { id, title, last_message, unread_count } = chat;
    const { avatar, first_name, second_name } = (last_message?.user || {});

    window[`openChat-${id}`] = openChat;

    return `
      <div
        class="left-side__list unit ${ activeChat?.id === id ? 'unit--active' : '' }"
        onclick="window['openChat-${id}'](${id})"
      >
        <div class="unit__avatar">
        ${
          avatar ? `
            <img src="${baseResourcesApiUrl}${avatar}" />
          ` : ``
        }
        </div>
        <div class="unit__text">
          <p class="unit__text__name">${title}</p>
          <p class="unit__text__message">
            ${
              last_message ? `
                <span class="unit__text__message__identity">
                  ${second_name} ${first_name}:
                </span>
                <span class="unit__text__message__text message-text">${last_message.content}</span>
              ` : ``
            }
          </p>
        </div>
        <div class="unit__parameters">
        ${
          last_message ? `
            <p class="unit__parameters__timestamp">${lastMessageDate(last_message.time)}</p>
          ` : ``
        }
        ${
          unread_count ? `
            <p class="unit__parameters__messages-count">${unread_count}</p>
          ` : ``
        }
        </div>
      </div>
    `
  })
    .join('');

  return `
    <div id="{{ id }}" class="left-side">
      <div class="left-side__top">
        {{ button }}
        <input id="search-messages" type="text" name="{{ inputs[0].name }}" placeholder="{{ inputs[0].placeholder }}" />
      </div>
      <div class="left-side__list">
        ${chats}
      </div>
    </div>
  `
}

export default class LeftSide extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign({}, props, { _state: ['chats', 'activeChat'] });

    super(concatProps);
  }

  render() {
    this.props.id = this.id;
    const tmpl = new Templator(generateTemplate());
    return tmpl.compile(this.props);
  }
};
