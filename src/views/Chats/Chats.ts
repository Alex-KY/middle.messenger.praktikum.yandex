import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

import ChatsController from '../../controllers/ChatsController';

import LeftSide from './components/LeftSide';
import MessagesBlock from './components/MessagesBlock';
import CreateChatDialog from './components/CreateChatDialog';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';
import Message from './components/Message';

import { Props as Properties } from '../../utils/types';

import "./Chats.scss";

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
        fu: toProfilePage
      },
      tagName: 'span',
      class: 'y-btn--link gray-text'
    }).render(),
  inputs: [
    {
      name: 'search',
      placeholder: 'Поиск'
    }
  ],
  units: [
    {
      username: 'Николай',
      messages: [
        {
          text: 'Друзья, у меня для вас особенный выпуск горячих новостей!',
          timestamp: '13:52',
          my: true,
          readed: false
        }
      ],
      newMessages: 4
    },
    {
      username: '1,2,3 Станислав Леонидович',
      messages: [
        {
          text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать на своём портале.',
          timestamp: '1 Мая 2020',
          my: false,
          readed: false
        }
      ],
      newMessages: 127
    }
  ]
};

function send(e: string) {
  if (!e.trim()) return
  console.warn(e);
}
function toProfilePage() {
  router.go('/profile');
}

async function fetchChats(offset = 0, limit = 5, title = '') {
  const params = { offset, limit, title };
  await chatsController.fetchChats(params);
}

function activateCreateChatDialog() {
  CreateChatDialog.assignProps({ active: true });
}

async function deleteChat() {
  const chatId = store.getState('currentChat')?.id;
  await chatsController.deleteChat({ chatId });
  fetchChats();
}

fetchChats();

import * as deleteIcon from 'bundle-text:/static/icons/delete.svg';
import * as plus from 'bundle-text:/static/icons/plus.svg';
import * as arrow from 'bundle-text:/static/icons/arrow.svg';
import * as clip from 'bundle-text:/static/icons/clip.svg';
import store from '../../utils/store';

const image = require('/static/imgs/photo.png');

const messagesBlockProps = {
  empty: 'Выберите чат чтобы отправить сообщение',
  buttonAdd:
    new YButton({
      icon: plus,
      click: {
        fu: activateCreateChatDialog
      },
      title: 'Добавить пользователя',
      class: 'y-btn--fab',
      color: 'transparent'
    }).render(),
  header: {
    user: 'Вадим',
    components: [
      new YButton({
        icon: deleteIcon,
        class: 'y-btn--fab',
        title: 'Удалить чат',
        click: {
          fu: deleteChat
        },
        color: 'transparent'
      }).render()
    ]
  },
  messages: [
    {
      date: '19 июня',
      messages: [

        new Message({
          time: '17:52',
          text: `'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

          Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'`
        }).render(),

        new Message({
          time: '17:53',
          image: `<img width="100%" height="auto" src="${image}" />`
        }).render(),

        new Message(
          {
            personal: true,
            time: '17:53',
            text: `Круто!`
          }
        ).render()
      ]
    }
  ],
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
          fu: send,
          params: ['\'send\'']
        },
        class: 'y-btn--fab send'
      }).render()

    ]
  }
};

function generateTemplate() {
  return {
    LeftSide: new LeftSide(leftSideProps).render(),
    MessageBlock: new MessagesBlock(messagesBlockProps).render()
  }
}

interface Props extends Properties {
  LeftSide: string,
  MessageBlock: string
};

export default class Chat extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign(generateTemplate(), props);

    super(concatProps);
  };

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  };
};
