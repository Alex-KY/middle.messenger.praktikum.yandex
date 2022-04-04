import Router from '../../utils/router';

import Block from '../../utils/block';
import Templator from '../../utils/templater';

import AuthController from '../../controllers/AuthController';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

import {
  loginPattern,
  namePattern,
  emailPattern,
  phonePattern,
  passwordPattern
} from '../../utils/verifications/patterns';

import { Props as Properties } from '../../utils/types';

import "./Signup.scss";

const template = `
  <div class="signup-block">
    <p class="title">{{ title }}</p>
    <form name="signup" class="signup-block__form">
      <div class="signup-block__form__inputs">
        {{ #each inputs }}
      </div>
      <div class="signup-block__form__buttons">
        {{ #each buttons }}
      </div>
      <div class="signup-block__form__response-error"></div>
    </form>
  </div>
`;

const router = new Router();
const authController = new AuthController();

function toChatPage() {
  router.go('/chats');
}

function setErrorBlock (text?: string) {
  const errorBlock = document.querySelector('.signup-block__form__response-error');
  if (errorBlock) {
    errorBlock.textContent = text || '';
    errorBlock.classList.toggle('error--active', Boolean(text));
  }
}

async function signup(e: PointerEvent) {
  e.preventDefault();
  setErrorBlock();

  const { form } = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formObject = [...formData.entries()]
    .reduce((accum, [key, value]) => value ? Object.assign(accum, { [key]: value }) : accum, {});

  if (!form.checkValidity()) {
    [...form.elements].forEach((item: HTMLElement) => {
      checkInput(item as HTMLInputElement);
    });
  } else {
    const res = await authController.signup(formObject);
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
}

function checkField(e: Event) {
  const type = e.type as string;
  const target = e.target as HTMLInputElement;

  checkInput(target);

  const targetLabel = target.parentNode?.querySelector('.y-label');
  const labelActive = type === 'focus' || (type === 'blur' && !!target.value);
  targetLabel?.classList.toggle('y-label--active', labelActive);
}

function checkPassword(e: Event) {
  const target = e.target as HTMLInputElement;
  const { value: passwordValue } = target as HTMLInputElement;
  const nodePassword = target.form?.querySelector('[name=repeatPassword]') as HTMLInputElement;
  const { value: passwordRepeatValue } = nodePassword;
  const valid = passwordValue.trim() && passwordRepeatValue.trim() && passwordValue === passwordRepeatValue;

  target.classList.toggle('y-input__input--invalid', !valid);
  checkField(e);
}

function checkInput (target: HTMLInputElement) {
  const { valid } = target.validity;
  target.classList.toggle('y-input__input--invalid', !valid);
  return valid;
}

const inputEventFocus = {
  fu: checkField,
  params: ['event']
};
const inputEventBlur = {
  fu: checkField,
  params: ['event']
};

const context = {
  title: 'Регистрация',
  inputs: [

    new YInput({
      name: 'email',
      label: 'Почта',
      type: 'email',
      required: true,
      pattern: emailPattern.source,
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      name: 'login',
      label: 'Логин',
      required: true,
      pattern: loginPattern.source,
      errorText: 'Латиница 3-20 символов',
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      name: 'first_name',
      label: 'Имя',
      required: true,
      pattern: namePattern.source,
      errorText: 'Латиница или кирилица с заглавной буквы',
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      name: 'second_name',
      label: 'Фамилия',
      required: true,
      pattern: namePattern.source,
      errorText: 'Латиница или кирилица с заглавной буквы',
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      name: 'phone',
      label: 'Телефон',
      type: 'tel',
      required: true,
      pattern: phonePattern.source,
      errorText: 'Цифры 10-15 символов',
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      type: 'password',
      name: 'password',
      label: 'Пароль',
      required: true,
      pattern: passwordPattern.source,
      errorText: '8-40 символов, хотя бы 1 цифра, заглавная буква',
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      type: 'password',
      name: 'repeatPassword',
      label: 'Пароль (ещё раз)',
      required: true,
      pattern: passwordPattern.source,
      errorText: 'Пароли должны совпадать',
      focus: {
        fu: checkPassword,
        params: ['event']
      },
      blur: {
        fu: checkPassword,
        params: ['event']
      }
    }).render()

  ],
  buttons: [

    new YButton({
      text: 'Зарегистрироваться',
      click: {
        fu: signup,
        params: ['event']
      }
    }).render()

  ]
};

interface Props extends Properties {
  title: string,
  inputs: string[],
  buttons: string[]
}

export default class Signup extends Block<Props> {
  constructor(props: Props) {
    const concatProps = Object.assign(props, context);

    super(concatProps);
  }

  render(): string {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
