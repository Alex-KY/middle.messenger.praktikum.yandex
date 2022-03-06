import Block from '../../utils/block';
import Templator from '../../utils/templater';
import renderDOM from '../..//utils/renderDOM';

import YButton from '../../components/YButton';
import YInput from '../../components/YInput';

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

function login() {
  window.location.pathname = '/chat';
}
function signup(event: PointerEvent) {
  event.preventDefault();

  const { form } = event.target as HTMLButtonElement;
  const formData: any = new FormData(form);
  const formObject = [...formData.entries()]
    .reduce((accum, [key, value]) => Object.assign(accum, { [key]: value }), {})

  console.warn(formObject)

  // window.location.pathname = '/signup';
}
function input(e) {
  // console.warn([e]);
  // const valid = e?.target?.form
}

function createNewButton(props) {
  return new YButton(props)
    .render();
};

function createNewInput(props) {
  return new YInput(props)
    .render();
};

const inputEventFocus = {
  fu: input,
  params: ['event']
}

const props = {
  title: 'Регистрация',
  inputs: [

    createNewInput({
      name: 'email',
      placeholder: 'Почта',
      required: true,
      pattern: '([a-zA-Z][a-zA-Z0-9\-\_]{1,}|([\d]{1,}[a-zA-Z]{1,}[\d]{0,}))@[a-zA-Z]{2,}.[a-zA-Z]{2,3}',
      focus: inputEventFocus
    }),

    createNewInput({
      name: 'login',
      placeholder: 'Логин',
      focus: inputEventFocus
    }),

    createNewInput({
      name: 'first_name',
      placeholder: 'Имя',
      required: true,
      pattern: '([A-Z]{1}[a-zA-Z\-]{1,100}[a-zA-Z]{1})|([А-Я]{1}[а-яА-Я\-]{1,100}[а-яА-Я]{1})',
      focus: inputEventFocus
    }),

    createNewInput({
      name: 'second_name',
      placeholder: 'Фамилия',
      pattern: '([A-Z]{1}[a-zA-Z\-]{1,100}[a-zA-Z]{1})|([А-Я]{1}[а-яА-Я\-]{1,100}[а-яА-Я]{1})',
      focus: inputEventFocus
    }),

    createNewInput({
      name: 'phone',
      placeholder: 'Телефон',
      pattern: '\+?[0-9]{8,15}',
      focus: inputEventFocus
    }),

    createNewInput({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      required: true,
      pattern: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$',
      focus: inputEventFocus
    }),

    createNewInput({
      type: 'password',
      name: 'password',
      placeholder: 'Пароль (ещё раз)',
      required: true,
      pattern: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$',
      focus: inputEventFocus
    })

  ],
  buttons: [

    createNewButton({
      text: 'Зарегистрироваться',
      click: {
        fu: signup,
        params: ['event']
      }
    }),

    createNewButton({
      text: 'Войти',
      click: {
        fu: login
      },
      tagName: 'a'
    })

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
