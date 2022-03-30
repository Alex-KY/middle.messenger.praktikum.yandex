import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import ChatsController from '../../../../controllers/ChatsController';

import store from '../../../../utils/store';

import { Props as Properties } from '../../../../utils/types';

import "./LeftSide.scss";

interface Props extends Properties {
  profile: string,
  inputs: {
      name: string,
      placeholder: string
  }[],
  units: {
      username: string,
      messages: {
          text: string,
          timestamp: string,
          my: boolean,
          readed: boolean
      }[],
      newMessages: number
  }[]
};

const chatsController = new ChatsController();

function openChat(id: number) {
  chatsController.fetchChat(id);
}

function generateTemplate() {
  const state = store.getState('chats') || [];
  const chats = state.map((chat: any) => {
    const { id, title, last_message, unread_count } = chat;
    window[`openChat-${id}`] = openChat;

    return `
      <div class="left-side__list unit" onclick="window['openChat-${id}'](${id})">
        <div class="unit__avatar"></div>
        <div class="unit__text">
          <p class="unit__text__name">${title}</p>
          <p class="unit__text__message">
            ${
              last_message ? `
                <span class="unit__text__message__identity">Вы:</span>
                <span class="unit__text__message__text message-text">${last_message.content}</span>
              ` : ``
            }
          </p>
        </div>
        <div class="unit__parameters">
        ${
          last_message ? `
            <p class="unit__parameters__timestamp">${last_message.time}</p>
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
    const concatProps = Object.assign({}, props, { _state: 'chats' });

    super(concatProps);
  }

  render() {
    this.props.id = this.id;
    const tmpl = new Templator(generateTemplate());
    return tmpl.compile(this.props);
  }
};
