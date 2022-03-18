import Block from '../../utils/block';
import Templator from '../../utils/templater';

import LeftSide from './components/LeftSide';
import MessagesBlock from './components/MessagesBlock';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';
import Message from './components/Message';

import Properties from '../../utils/types';

import "./Chat.scss";

const template = `
  {{ LeftSide }}
  {{ MessageBlock }}
`;

const leftSideProps = {
  profile: 'Профиль >',
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
};

import * as ellipsisVert from 'bundle-text:/static/icons/ellipsis-vert.svg';
import * as arrow from 'bundle-text:/static/icons/arrow.svg';
import * as clip from 'bundle-text:/static/icons/clip.svg';

const image = require('/static/imgs/photo.png');

const messagesBlockProps = {
  empty: 'Выберите чат чтобы отправить сообщение',
  header: {
    user: 'Вадим',
    components: [
      new YButton({
        icon: ellipsisVert,
        class: 'y-btn--fab',
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

const context = {
  LeftSide: new LeftSide(leftSideProps).render(),
  MessageBlock: new MessagesBlock(messagesBlockProps).render()
};

interface Props extends Properties {
  LeftSide: string,
  MessageBlock: string
};

export default class Chat extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign(props, context);

    super(concatProps);
    this.props = concatProps;
  };

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  };
};
