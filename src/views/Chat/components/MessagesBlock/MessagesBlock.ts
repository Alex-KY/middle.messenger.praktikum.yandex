import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';
import renderDOM from '../../../../utils/renderDOM';

import YButton from '../../../../components/YButton';
import YInput from '../../../../components/YInput';
import Message from './components/Message';

import "./MessagesBlock.scss";

const template = `
  <div class="messages-block">
    <!--<div class="messages-block__empty">{{ empty }}</div>-->
    <div class="messages-block__header">
      <div class="user">
        <div class="user__avatar"></div>
        <div class="user__name">{{ header.user }}</div>
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
  </div>
`;

function input(e) {
  console.warn(e);
}
function click(e) {
  console.warn(e);
}
function send(e) {
  if (!e.trim()) return
  console.warn(e);
}

function createNewButton(props) {
  return new YButton(props)
    .render();
};

function createNewInput(props) {
  return new YInput(props)
    .render();
};

function createNewMessage(props) {
  return new Message(props)
    .render();
};

import * as ellipsisVert from 'bundle-text:/static/icons/ellipsis-vert.svg';
import * as arrow from 'bundle-text:/static/icons/arrow.svg';
import * as clip from 'bundle-text:/static/icons/clip.svg';

const image = require('/static/imgs/photo.png');

const props = {
  empty: 'Выберите чат чтобы отправить сообщение',
  header: {
    user: 'Вадим',
    components: [
      createNewButton({
        icon: ellipsisVert,
        click: {
          fu: click,
          params: ['menu']
        },
        class: 'y-btn--fab',
        color: 'transparent'
      })
    ]
  },
  messages: [
    {
      date: '19 июня',
      messages: [

        createNewMessage({
          time: '17:52',
          text: `'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

          Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.'`
        }),

        createNewMessage({
          time: '17:53',
          image: `<img width="100%" height="auto" src="${image}" />`
        }),

        createNewMessage(
          {
            personal: true,
            time: '17:53',
            text: `Круто!`
          }
        )
      ]
    }
  ],
  footer: {
    attachIcon: clip,
    sendIcon: arrow,
    components: [

      createNewButton({
        icon: clip,
        click: {
          fu: click,
          params: ['\'attach\'']
        },
        class: 'y-btn--fab',
        color: 'transparent'
      }),

      createNewInput({
        placeholder: 'Сообщение',
        name: 'message',
        input: {
          fu: input,
          params: ['event.target.value']
        },
        keydown: {
          fu: send,
          params: ['\'send\'']
        }
      }),

      createNewButton({
        icon: arrow,
        click: {
          fu: send,
          params: ['\'send\'']
        },
        class: 'y-btn--fab send'
      })

    ]
  }
};

export default class MessagesBlock extends Block {
  constructor() {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new MessagesBlock().render();
renderDOM(renderedTemplate);
