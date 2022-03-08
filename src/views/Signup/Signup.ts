import Block from '../../utils/block';
import Templator from '../../utils/templater';
import renderDOM from '../../utils/renderDOM';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

import {
  loginPattern,
  namePattern,
  emailPattern,
  phonePattern,
  passwordPattern
} from '../../utils/verifications/patterns';

import "./Signup.scss";

const template = `
  <div class="signup-block">
    <p class="title">{{ title }}</p>
    <form name="signup" class="signup-block__form" onsubmit={{ signup }}>
      <div class="signup-block__form__inputs">
        {{ #each inputs }}
      </div>
      <div class="signup-block__form__buttons">
        {{ #each buttons }}
      </div>
    </form>
  </div>
`;

function toLoginPage() {
  window.location.pathname = '/chat';
}

function signup(event: PointerEvent) {
  event.preventDefault();

  const { form } = event.target as HTMLButtonElement;
  const formData: any = new FormData(form);
  const formObject = [...formData.entries()]
    .reduce((accum, [key, value]) => Object.assign(accum, { [key]: value }), {});

  console.warn(formObject);

  if (!form.checkValidity()) {
    [...form.elements].forEach((item: HTMLElement) => {
      checkInput(item);
    });
  } else {
    window.location.pathname = '/login';
  }
}

function checkField(e: Event) {
  const { target, type } = e;
  checkInput(target);

  const targetLabel = target.parentNode.querySelector('.y-label');
  const labelActive = type === 'focus' || (type === 'blur' && target.value);
  targetLabel.classList.toggle('y-label--active', labelActive);
}

function checkPassword(e: Event) {
  const { target } = e;
  const { value: passwordValue } = target;
  const nodePassword = target.form.querySelector('[name=password]') as HTMLElement;
  const { value: passwordRepeatValue } = nodePassword;
  const valid = passwordValue.trim() && passwordRepeatValue.trim() && passwordValue === passwordRepeatValue;

  target.classList.toggle('y-input__input--invalid', !valid);
  checkField(e);
}

function checkInput (target: HTMLElement) {
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
  title: 'Регистрация',
  inputs: [

    new YInput({
      name: 'email',
      label: 'Почта',
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
      pattern: namePattern.source,
      errorText: 'Латиница или кирилица с заглавной буквы',
      focus: inputEventFocus,
      blur: inputEventBlur
    }).render(),

    new YInput({
      name: 'phone',
      label: 'Телефон',
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
    }).render(),

    new YButton({
      text: 'Войти',
      click: {
        fu: toLoginPage
      },
      tagName: 'a'
    }).render()

  ]
};

export default class Signup extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new Signup(props).render();
renderDOM(renderedTemplate, {class: 'signup-page'});
