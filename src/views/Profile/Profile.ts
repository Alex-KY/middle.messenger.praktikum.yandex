import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

import AuthController from '../../controllers/AuthController';

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
      <div class="profile-page__content__avatar-block__avatar">
        <img src="{{ userData.avatar }}" />
        {{ buttonAvatar }}
      </div>
      <span>{{ userData.first_name }}</span>
    </div>
    <div class="profile-page__content__data-block dividered-content">
      <div class="dividered-content__row">
        <span>{{ rows[0].text }}</span>
        <span>{{ userData.email }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[1].text }}</span>
        <span>{{ userData.login }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[2].text }}</span>
        <span>{{ userData.first_name }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[3].text }}</span>
        <span>{{ userData.second_name }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[4].text }}</span>
        <span>{{ userData.display_name }}</span>
      </div>
      <div class="dividered-content__row">
        <span>{{ rows[5].text }}</span>
        <span>{{ userData.phone }}</span>
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
  router.go('/chats');
}

async function logout(e: PointerEvent) {
  e.preventDefault();

  const res = await authController.logout();
  if (res.status === 200) {
    toSigninPage();
  }
}

function activateUserAvatarDialog() {
  UserAvatarDialog.setProps({ active: true });
}
function activateUserDataDialog() {
  getContext();
  UserDataDialog.setProps({ active: true });
}
function activateUserPasswordDialog() {
  UserPasswordDialog.setProps({ active: true });
}

const context = {
  userData: {
    avatar: image
  },
  rows: [
    {
      text: '??????????'
    },
    {
      text: '??????????'
    },
    {
      text: '??????'
    },
    {
      text: '??????????????'
    },
    {
      text: '?????? ?? ????????'
    },
    {
      text: '??????????????'
    }
  ],
  buttonAvatar:
    new YButton({
      text: '???????????????? ????????????',
      class: 'avatar-button',
      click: {
        callback: activateUserAvatarDialog
      }
    }).render(),
  buttonBack: new YButton({
      icon: arrow,
      click: {
        callback: back
      },
      class: 'y-btn--fab'
    }).render(),
  buttons: [

    new YButton({
      text: '???????????????? ????????????',
      click: {
        callback: activateUserDataDialog
      },
      tagName: 'span',
      class: 'y-btn--link'
    }).render(),

    new YButton({
      text: '???????????????? ????????????',
      click: {
        callback: activateUserPasswordDialog
      },
      tagName: 'span',
      class: 'y-btn--link'
    }).render(),

    new YButton({
      text: '??????????',
      click: {
        callback: logout,
        params: ['event']
      },
      tagName: 'span',
      class: 'y-btn--link error-text'
    }).render()

  ]
};

interface Props extends Properties {
  icons?: {
      image: string
  },
  name?: string,
  rows?: {
      text: string,
      value: string
  }[],
  buttons?: string[]
}

export default class Profile extends Block<Props> {
  constructor(props: Props = {}) {
    const concatProps = Object.assign(context, props, { _state: 'userData' });

    super(concatProps);
  }

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
