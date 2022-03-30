import UserController from '../../../../controllers/UserController';

import store from '../../../../utils/store';

import YDialog from '../../../../components/YDialog';
import YButton from '../../../../components/YButton';
import YInput from '../../../../components/YInput';

import {
  loginPattern,
  namePattern,
  emailPattern,
  phonePattern
} from '../../../../utils/verifications/patterns';

import "./UserDataDialog.scss";

const userController = new UserController();
const state = (value: string) => store.getState().userData?.[value] || '';

function setErrorBlock (text?: string) {
  const errorBlock = document.querySelector('.user-data__form__response-error');
  if (errorBlock) {
    errorBlock.textContent = text || '';
    errorBlock.classList.toggle('error--active', Boolean(text));
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

async function changeUserData(e: PointerEvent) {
  e.preventDefault();
  setErrorBlock();

  const { form } = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formObject = [...formData.entries()]
    .reduce((accum, [key, value]) => Object.assign(accum, { [key]: value }), {});

  if (!form.checkValidity()) {
    [...form.elements].forEach((item: HTMLElement) => {
      checkInput(item as HTMLInputElement);
    });
  } else {
    const res = await userController.changeUserData(formObject);
    if (res.status === 200) {
      dialog.hide();
    } else {
      const status = res.status ? `${res.status}. ` : ``;
      setErrorBlock(`${status}${res.data?.reason || 'Неизвестная ошибка'}`);
    }
  }
}

const inputEventFocus = {
  fu: checkField,
  params: ['event']
}
const inputEventBlur = {
  fu: checkField,
  params: ['event']
}

const template = `
  <form class="user-data__form">
    <div class="user-data__form__inputs">
      {{ #each content.inputs }}
    </div>
    <div class="user-data__form__buttons">
      {{ content.button }}
    </div>
    <div class="user-data__form__response-error"></div>
  </form>
`;

const inputs = () => {
  return [

    new YInput({
      name: 'email',
      label: 'Почта',
      type: 'email',
      pattern: emailPattern.source,
      focus: inputEventFocus,
      blur: inputEventBlur,
      value: state('email')
    }).render(),

    new YInput({
      name: 'login',
      label: 'Логин',
      pattern: loginPattern.source,
      errorText: 'Латиница 3-20 символов',
      focus: inputEventFocus,
      blur: inputEventBlur,
      value: state('login')
    }).render(),

    new YInput({
      name: 'first_name',
      label: 'Имя',
      pattern: namePattern.source,
      errorText: 'Латиница или кирилица с заглавной буквы',
      focus: inputEventFocus,
      blur: inputEventBlur,
      value: state('first_name')
    }).render(),

    new YInput({
      name: 'second_name',
      label: 'Фамилия',
      pattern: namePattern.source,
      errorText: 'Латиница или кирилица с заглавной буквы',
      focus: inputEventFocus,
      blur: inputEventBlur,
      value: state('second_name')
    }).render(),

    new YInput({
      name: 'display_name',
      label: 'Отображаемое имя',
      pattern: namePattern.source,
      errorText: 'Латиница или кирилица с заглавной буквы',
      focus: inputEventFocus,
      blur: inputEventBlur,
      value: state('display_name')
    }).render(),

    new YInput({
      name: 'phone',
      label: 'Телефон',
      type: 'tel',
      pattern: phonePattern.source,
      errorText: 'Цифры 10-15 символов',
      focus: inputEventFocus,
      blur: inputEventBlur,
      value: state('phone')
    }).render()

  ]
};

export function getContext() {
  context.content.inputs = inputs();
  return context;
}

const context = {
  title: 'Изменить данные',
  content: {
    template,
    inputs: inputs(),
    values: null,
    button: new YButton({
        text: 'Поменять',
        click: {
          fu: changeUserData,
          params: ['event']
        }
      }).render()
  }
};

const dialog = new YDialog(context);

export default dialog;
