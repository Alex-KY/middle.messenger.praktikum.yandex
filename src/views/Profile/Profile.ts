import Templator from '../../utils/templater/index';

const template = `
  <div class="profile-page__side-button">
    <button onclick="{{ back }}">{{ icons.arrow }}</button>
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
        <span class="button-text">{{ buttons[0].text }}</span>
      </div>
      <div class="dividered-content__row">
        <span class="button-text">{{ buttons[1].text }}</span>
      </div>
      <div class="dividered-content__row">
        <span class="button-text error-text" onclick="{{ exit }}">{{ buttons[2].text }}</span>
      </div>
    </div>
  </div>
`;

const tmpl = new Templator(template);

import * as arrow from 'bundle-text:/static/icons/arrow.svg';
import * as image from 'bundle-text:/static/icons/image.svg';

function exit () {
  window.location.pathname = '/login';
}
function back () {
  window.location.pathname = '/chat';
}

const context = {
  icons: {
    arrow,
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
    {
      text: 'Изменить данные'
    },
    {
      text: 'Изменить пароль'
    },
    {
      text: 'Выйти'
    }
  ],
  exit,
  back
};

export default (function () {
  const renderedTemplate = tmpl.compile(context);
  const root = document.querySelector('.root') as any;

  root.classList = 'root profile-page';
  root.innerHTML = renderedTemplate;
})();
