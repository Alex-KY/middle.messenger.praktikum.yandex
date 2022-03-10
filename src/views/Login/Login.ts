import Block from '../../utils/block';
import Templator from '../../utils/templater';
import renderDOM from '../../utils/renderDOM';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

import {
  loginPattern,
  passwordPattern
} from '../../utils/verifications/patterns';

import Properties from '../../utils/types';

import "./Login.scss";

const template = `
  <div class="sign-block">
    <p class="title">{{ title }}</p>
    <form name="login" class="sign-block__form" onsubmit="return false">
      <div class="sign-block__form__inputs">
        {{ #each inputs }}
      </div>
      <div class="sign-block__form__buttons">
      {{ #each buttons }}
      </div>
    </form>
  </div>
`;

function toLoginPage() {
  window.location.pathname = '/chat';
}

function toSignupPage() {
  window.location.pathname = '/signup';
}

function checkField(e) {
  const { target, type } = e;
  checkInput(target);

  const targetLabel = target.parentNode.querySelector('.y-label');
  const labelActive = type === 'focus' || (type === 'blur' && target.value);
  targetLabel.classList.toggle('y-label--active', labelActive);
}

function checkInput (target) {
  const { valid } = target.validity;
  target.classList.toggle('y-input__input--invalid', !valid);
  return valid;
}

const inputEventFocus = {
  fu: checkField,
  params: ['event']
}
const inputEventBlur = {
  fu: checkField,
  params: ['event']
}

const props = {
  title: 'Вход',
  inputs: [

    new YInput({
      label: 'Логин',
      name: 'login',
      required: true,
      pattern: loginPattern.source,
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      label: 'Пароль',
      name: 'password',
      required: true,
      pattern: passwordPattern.source,
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render()

  ],
  buttons: [

    new YButton({
      text: 'Авторизоваться',
      click: {
        fu: toLoginPage
      }
    }).render(),

    new YButton({
      text: 'Нет аккаунта?',
      click: {
        fu: toSignupPage
      },
      tagName: 'a'
    }).render()

  ]
};

interface Props extends Properties {

};

export default class Login extends Block<Props> {
  constructor(props) {
    super(props);
    this.props = props;
  };

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  };
};

const renderedTemplate = new Login(props).render();
renderDOM(renderedTemplate, {class: 'login-page'});
