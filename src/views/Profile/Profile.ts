import Block from '../../utils/block';
import Templator from '../../utils/templater';
import renderDOM from '../../utils/renderDOM';

import YButton from '../../components/YButton';

import './Profile.scss';

const template = `
  <div class="profile-page__side-button">
    {{ buttons[3] }}
  </div>
  <div class="profile-page__content">
    <div class="profile-page__content__avatar-block">
      <div class="profile-page__content__avatar-block__avatar">
        <button>{{ icons.image }}</button>
      </div>
      <span>{{ name }}</span>
    </div>
    <div class="profile-page__content__data-block dividered-content">
      <div class="dividered-content__row">
        <span>{{ rows[0].text }}</span>
        <span>{{ rows[0].value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[1].text }}</span>
        <span>{{ rows[1].value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[2].text }}</span>
        <span>{{ rows[2].value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[3].text }}</span>
        <span>{{ rows[3].value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[3].text }}</span>
        <span>{{ rows[3].value }}</span>
      </div>
      <div class="dividered-content__row">
      <span>{{ rows[4].text }}</span>
      <span>{{ rows[4].value }}</span>
      </div>
    </div>
    <div class="profile-page__content__buttons-block dividered-content">
      <div class="dividered-content__row">
        {{ buttons[0] }}
      </div>
      <div class="dividered-content__row">
      {{ buttons[1] }}
      </div>
      <div class="dividered-content__row">
      {{ buttons[2] }}
      </div>
    </div>
  </div>
`;

function createNewButton(props) {
  return new YButton(props)
    .render();
};

import * as arrow from 'bundle-text:/static/icons/arrow.svg';
import * as image from 'bundle-text:/static/icons/image.svg';

function exit() {
  window.location.pathname = '/login';
}
function back() {
  window.location.pathname = '/chat';
}
function click(e) {
  console.warn(e);
}

const props = {
  icons: {
    image
  },
  name: 'Иван',
  rows: [
    {
      text: 'Почта',
      value: 'pochta@yandex.ru'
    },
    {
      text: 'Почта',
      value: 'pochta@yandex.ru'
    },
    {
      text: 'Имя',
      value: 'Иван'
    },
    {
      text: 'Фамилия',
      value: 'Иванов'
    },
    {
      text: 'Имя в чате',
      value: 'Иван'
    },
    {
      text: 'Телефон',
      value: '+7 (909) 967 30 30'
    }
  ],
  buttons: [

    new YButton({
      text: 'Изменить данные',
      click: {
        fu: click
      },
      tagName: 'span',
      class: 'y-btn--link'
    }).render(),

    new YButton({
      text: 'Изменить пароль',
      click: {
        fu: click
      },
      tagName: 'span',
      class: 'y-btn--link'
    }).render(),

    new YButton({
      text: 'Выйти',
      click: {
        fu: exit
      },
      tagName: 'span',
      class: 'y-btn--link error-text'
    }).render(),

    new YButton({
      icon: arrow,
      click: {
        fu: back
      },
      class: 'y-btn--fab'
    }).render()

  ]
};

export default class Profile extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new Profile(props).render();
renderDOM(renderedTemplate, {class: 'profile-page'});
