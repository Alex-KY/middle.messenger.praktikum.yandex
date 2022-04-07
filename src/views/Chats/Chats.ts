import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

import store from '../../utils/store';

import ChatsController from '../../controllers/ChatsController';
import MessagesController from '../../controllers/MessagesController';

import LeftSide from './components/LeftSide';
import MessagesBlock from './components/MessagesBlock';
import CreateChatDialog from './components/CreateChatDialog';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

import { Props as Properties } from '../../utils/types';

import "./Chats.scss";

import * as deleteIcon from 'bundle-text:/static/icons/delete.svg';
import * as plus from 'bundle-text:/static/icons/plus.svg';
import * as arrow from 'bundle-text:/static/icons/arrow.svg';
import * as clip from 'bundle-text:/static/icons/clip.svg';

const template = `
  {{ LeftSide }}
  {{ MessageBlock }}
  ${ CreateChatDialog.render() }
`;

const router = new Router();
const chatsController = new ChatsController();

const leftSideProps = {
  button:
    new YButton({
      text: 'Профиль >',
      click: {
        callback: toProfilePage
      },
      tagName: 'span',
      class: 'y-btn--link gray-text'
    }).render(),
  inputs: [
    {
      name: 'search',
      placeholder: 'Поиск'
    }
  ]
};

function send(e: PointerEvent) {
  e.preventDefault();
  const target = e.target as HTMLInputElement | HTMLFormElement;

  const form = target.localName === 'form' ? target : target.form;
  const input = form.querySelector('.y-input__input') as HTMLInputElement;
  const value = input.value;

  if (!value.trim()) return;

  MessagesController.sendMessage({ type: 'message', content: value });
  input.value = '';
}

function toProfilePage() {
  router.go('/profile');
}

async function fetchChats(offset = 0, limit = 5, title = '') {
  const params = { offset, limit, title };
  await chatsController.fetchChats(params);
}

function activateCreateChatDialog() {
  CreateChatDialog.setProps({ active: true });
}

async function deleteChat() {
  const chatId = store.getState('activeChat')?.id;
  await chatsController.deleteChat({ chatId });
  fetchChats();
}

const messagesBlockProps = {
  empty: 'Выберите чат чтобы отправить сообщение',
  buttonAdd:
    new YButton({
      icon: plus,
      click: {
        callback: activateCreateChatDialog
      },
      title: 'Добавить пользователя',
      class: 'y-btn--fab',
      color: 'transparent'
    }).render(),
  header: {
    components: [
      new YButton({
        icon: deleteIcon,
        class: 'y-btn--fab',
        title: 'Удалить чат',
        click: {
          callback: deleteChat
        },
        color: 'transparent'
      }).render()
    ]
  },
  footer: {
    attachIcon: clip,
    sendIcon: arrow,
    components: [

      new YButton({
        icon: clip,
        class: 'y-btn--fab',
        color: 'transparent'
      }).render(),

      new YInput({
        placeholder: 'Сообщение',
        name: 'message',
        hideDetails: true
      }).render(),

      new YButton({
        icon: arrow,
        click: {
          callback: send,
          params: ['event']
        },
        class: 'y-btn--fab send'
      }).render()

    ],
    fnSubmit: send
  }
};

function generateTemplate() {
  return {
    LeftSide: new LeftSide(leftSideProps).render(),
    MessageBlock: new MessagesBlock(messagesBlockProps).render()
  };
}

interface Props extends Properties {
  LeftSide: string,
  MessageBlock: string
}

export default class Chats extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign(generateTemplate(), props,  { _state: 'userData' });

    super(concatProps);
  }

  render() {
    if (store.getState('userData')) {
      fetchChats();
    }
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
