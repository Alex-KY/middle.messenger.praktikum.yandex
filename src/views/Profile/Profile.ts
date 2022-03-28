import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

import AuthController from '../../controllers/AuthController';

import store from '../../utils/store';

import YButton from '../../components/YButton';
import UserAvatarDialog from './components/UserAvatarDialog';
import UserDataDialog from './components/UserDataDialog';
import UserPasswordDialog from './components/UserPasswordDialog';

import { getContext } from './components/UserDataDialog';

import { Props as Properties } from '../../utils/types';

import './Profile.scss';

const template = `
  <div class="profile-page__side-button">
    {{ buttonBack }}
  </div>
  <div class="profile-page__content">
    <div class="profile-page__content__avatar-block">
      <div style="background-image: url({{ userData.avatar }})" class="profile-page__content__avatar-block__avatar">
        {{ buttonAvatar }}
      </div>
      <span>{{ userData.first_name }}</span>
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
        <span>{{ rows[4].text }}</span>
        <span>{{ rows[4].value }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[5].text }}</span>
        <span>{{ rows[5].value }}</span>
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
  ${ UserAvatarDialog.render() }
  ${ UserDataDialog.render() }
  ${ UserPasswordDialog.render() }
`;

const router = new Router();
const authController = new AuthController();

import * as arrow from 'bundle-text:/static/icons/arrow.svg';
const image = require('/static/icons/image.svg');

function toSigninPage() {
  router.go('/signin');
}
function back() {
  router.go('/chat');
}

async function logout(e: PointerEvent) {
  e.preventDefault();

  const res = await authController.logout();
  if (res.status === 200) {
    toSigninPage();
  }
}

function activateUserAvatarDialog() {
  UserAvatarDialog.assignProps({ active: true });
}
function activateUserDataDialog() {
  getContext();
  UserDataDialog.assignProps({ active: true });
}
function activateUserPasswordDialog() {
  UserPasswordDialog.assignProps({ active: true });
}

function prepareProps(props: any) {
  const avatar = !props.userData.avatar ? image : `https://ya-praktikum.tech/api/v2/resources${props.userData.avatar}`;
  Object.assign(props.userData, { avatar });
  return { ...props };
}

const context = {
  userData: {
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: image
  },
  rows: [
    {
      text: 'Почта',
      value: 'pochta@yandex.ru'
    },
    {
      text: 'Логин',
      value: 'Borislav'
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
  buttonAvatar:
    new YButton({
      text: 'Поменять аватар',
      class: 'avatar-button',
      click: {
        fu: activateUserAvatarDialog
      }
    }).render(),
  buttonBack: new YButton({
      icon: arrow,
      click: {
        fu: back
      },
      class: 'y-btn--fab'
    }).render(),
  buttons: [

    new YButton({
      text: 'Изменить данные',
      click: {
        fu: activateUserDataDialog
      },
      tagName: 'span',
      class: 'y-btn--link'
    }).render(),

    new YButton({
      text: 'Изменить пароль',
      click: {
        fu: activateUserPasswordDialog
      },
      tagName: 'span',
      class: 'y-btn--link'
    }).render(),

    new YButton({
      text: 'Выйти',
      click: {
        fu: logout,
        params: ['event']
      },
      tagName: 'span',
      class: 'y-btn--link error-text'
    }).render()

  ]
};

interface Props extends Properties {
  icons?: {
      image: any
  },
  name?: string,
  rows?: {
      text: string,
      value: string
  }[],
  buttons?: string[]
};

export default class Profile extends Block<Props> {
  constructor(props: Props = {}) {
    const concatProps = Object.assign(context, prepareProps(props));

    super(concatProps);
  };

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  };
};
