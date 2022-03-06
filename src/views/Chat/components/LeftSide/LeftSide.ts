import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';
import renderDOM from '../../../../utils/renderDOM';

import "./LeftSide.scss";

const template = `
  <div class="left-side">
    <div class="left-side-top">
      <a id="profile-link" class="link-text gray-text" href="/profile">{{ profile }}</a>
      <input id="search-messages" type="text" name="{{ inputs[0].name }}" placeholder="{{ inputs[0].placeholder }}" />
    </div>
    <div class="left-side-list">
      <div class="left-side-list unit">
        <div class="unit__avatar"></div>
        <div class="unit__text">
          <p class="unit__text__name">{{ units[0].username }}</p>
          <p class="unit__text__message">
            <span class="unit__text__message__identity">Вы:</span>
            <span class="unit__text__message__text message-text">{{ units[0].messages[0].text }}</span>
          </p>
        </div>
        <div class="unit__parameters">
          <p class="unit__parameters__timestamp">{{ units[0].messages[0].timestamp }}</p>
          <p class="unit__parameters__messages-count">{{ units[0].newMessages }}</p>
        </div>
      </div>
      <div class="left-side-list unit">
        <div class="unit__avatar"></div>
        <div class="unit__text">
          <p class="unit__text__name">{{ units[1].username }}</p>
          <p class="unit__text__message">
            <span class="unit__text__message__text message-text">{{ units[1].messages[0].text }}</span>
          </p>
        </div>
        <div class="unit__parameters">
          <p class="unit__parameters__timestamp">{{ units[1].messages[0].timestamp }}</p>
          <p class="unit__parameters__messages-count">{{ units[1].newMessages }}</p>
        </div>
      </div>
    </div>
  </div>
`;

const props = {
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

export default class LeftSide extends Block {
  constructor() {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new LeftSide().render();
renderDOM(renderedTemplate);
