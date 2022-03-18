import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

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

const router = new Router();

function toLoginPage() {
  router.go('/chat');
}

function toSignupPage() {
  router.go('/signup');
}

function checkField(e: Event) {
  const type = e.type as string;
  const target = e.target as HTMLInputElement;

  checkInput(target);

  const targetLabel = target.parentNode?.querySelector('.y-label');
  const labelActive = type === 'focus' || (type === 'blur' && !!target.value);
  targetLabel?.classList.toggle('y-label--active', labelActive);
}

function checkInput (target: HTMLInputElement) {
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

const context = {
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
  title: string,
  inputs: string[],
  buttons: string[]
};

export default class Login extends Block<Props> {
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
