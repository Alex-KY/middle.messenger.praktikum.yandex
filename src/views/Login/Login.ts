import Block from '../../utils/block';
import Templator from '../../utils/templater';
import renderDOM from '../..//utils/renderDOM';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

import "./Login.scss";

const template = `
  <div class="sign-block">
    <p class="title">{{ title }}</p>
    <form class="sign-block__form" onsubmit="return false">
      <div class="sign-block__form__inputs">
        {{ #each inputs }}
      </div>
      <div class="sign-block__form__buttons">
      {{ #each buttons }}
      </div>
    </form>
  </div>
`;

function login() {
  window.location.pathname = '/chat';
}
function signup() {
  window.location.pathname = '/signup';
}
function input(e) {
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

const props = {
  title: 'Вход',
  inputs: [

    createNewInput({
      placeholder: 'Логин',
      name: 'login',
      input: {
        fu: input,
        params: ['event.target.value']
      }
    }),

    createNewInput({
      placeholder: 'Пароль',
      name: 'password',
      input: {
        fu: input,
        params: ['event.target.value']
      }
    })

  ],
  buttons: [

    createNewButton({
      text: 'Авторизоваться',
      click: {
        fu: login
      }
    }),

    createNewButton({
      text: 'Нет аккаунта?',
      click: {
        fu: signup
      },
      tagName: 'a'
    })

  ]
};

export default class Login extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new Login(props).render();
renderDOM(renderedTemplate, {class: 'login-page'});
