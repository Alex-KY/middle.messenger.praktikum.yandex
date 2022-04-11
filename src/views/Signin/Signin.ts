import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

import AuthController from '../../controllers/AuthController';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

import {
  loginPattern,
  passwordPattern
} from '../../utils/verifications/patterns';

import { Props as Properties, SinginFormModel } from '../../utils/types';

import "./Signin.scss";

const template = `
  <div class="sign-block">
    <p class="title">{{ title }}</p>
    <form name="signin" class="sign-block__form" onsubmit="return false">
      <div class="sign-block__form__inputs">
        {{ #each inputs }}
      </div>
      <div class="sign-block__form__buttons">
      {{ #each buttons }}
      </div>
      <div class="sign-block__form__response-error"></div>
    </form>
  </div>
`;

const router = new Router();
const authController = new AuthController();

function toChatPage() {
  router.go('/chats');
}
function toSignupPage() {
  router.go('/signup');
}

function setErrorBlock (text?: string) {
  const errorBlock = document.querySelector('.sign-block__form__response-error');
  if (errorBlock) {
    errorBlock.textContent = text || '';
    errorBlock.classList.toggle('error--active', Boolean(text));
  }
}

async function signin(e: PointerEvent) {
  e.preventDefault();
  setErrorBlock();

  const { form } = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formObject = [...formData.entries()]
    .reduce((accum, [key, value]) => Object.assign(accum, { [key]: value }), {}) as SinginFormModel;

  const res = await authController.signin(formObject);

  if (res.status === 200) {
    const res = await authController.fetchUser();
    if (res.data?.id) {
      toChatPage();
    } else {
      setErrorBlock(`Ошибка входа. Попробуйте позже`);
    }
  } else {
    setErrorBlock(`${res.status}. ${res.data.reason || 'Неизвестная ошибка'}`);
  }
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
  callback: checkField,
  params: ['event']
};
const inputEventBlur = {
  callback: checkField,
  params: ['event']
};

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
      type: 'password',
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
        callback: signin,
        params: ['event']
      }
    }).render(),

    new YButton({
      text: 'Нет аккаунта?',
      click: {
        callback: toSignupPage
      },
      tagName: 'a'
    }).render()

  ]
};

interface Props extends Properties {
  title: string,
  inputs: string[],
  buttons: string[]
}

export default class Signin extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign(props, context);

    super(concatProps);
  }

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
