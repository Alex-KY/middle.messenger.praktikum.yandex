const template = `
  <div class="profile-page__side-button">
    <button onclick="{{ back }}">{{ icons.arrow }}</button>
  </div>
  <div class="profile-page__content">
    <div class="profile-page__content__avatar-block">
      <div class="profile-page__content__avatar-block__avatar">{{ icons.image }}</div>
      <span>{{ name }}</span>
    </div>
    <div class="profile-page__content__data-block dividered-content">
      <div class="dividered-content__row">
        <span>{{ rows.1.text }}</span>
        <span>{{ rows.1.value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows.2.text }}</span>
        <span>{{ rows.2.value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows.3.text }}</span>
        <span>{{ rows.3.value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows.4.text }}</span>
        <span>{{ rows.4.value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows.5.text }}</span>
        <span>{{ rows.5.value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows.6.text }}</span>
        <span>{{ rows.6.value }}</span>
      </div>
    </div>
    <div class="profile-page__content__buttons-block dividered-content">
      <div class="dividered-content__row">
        <span class="button-text">{{ buttons.1.text }}</span>
      </div>
      <div class="dividered-content__row">
        <span class="button-text">{{ buttons.2.text }}</span>
      </div>
      <div class="dividered-content__row">
        <span class="button-text error-text" onclick="{{ exit }}">{{ buttons.3.text }}</span>
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
  rows: {
    1: {
      text: 'Почта',
      value: 'pochta@yandex.ru'
    },
    2: {
      text: 'Логин',
      value: 'ivanivanov'
    },
    3: {
      text: 'Имя',
      value: 'Иван'
    },
    4: {
      text: 'Фамилия',
      value: 'Иванов'
    },
    5: {
      text: 'Имя в чате',
      value: 'Иван'
    },
    6: {
      text: 'Телефон',
      value: '+7 (909) 967 30 30'
    }
  },
  buttons: {
    1: {
      text: 'Изменить данные'
    },
    2: {
      text: 'Изменить пароль'
    },
    3: {
      text: 'Выйти'
    }
  },
  exit,
  back
};

const renderedTemplate = tmpl.compile(context);
const root = document.querySelector('.root');

root.classList = 'root profile-page';
root.innerHTML = renderedTemplate;