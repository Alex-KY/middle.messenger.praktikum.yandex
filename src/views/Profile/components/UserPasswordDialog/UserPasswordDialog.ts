import UserController from '../../../../controllers/UserController';

import YDialog from '../../../../components/YDialog';
import YButton from '../../../../components/YButton';
import YInput from '../../../../components/YInput';

import { passwordPattern } from '../../../../utils/verifications/patterns';

import "./UserPasswordDialog.scss";

const userController = new UserController();

function setErrorBlock (text?: string) {
  const errorBlock = document.querySelector('.user-password__form__response-error');
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

async function changeUserPassword(e: PointerEvent) {
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
    const res = await userController.changeUserPassword(formObject);
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
  <form class="user-password__form">
    <div class="user-password__form__inputs">
      {{ #each content.inputs }}
    </div>
    <div class="user-password__form__buttons">
      {{ content.button }}
    </div>
    <div class="user-password__form__response-error"></div>
  </form>
`;

const context = {
  title: 'Изменить пароль',
  content: {
    template,
    inputs: [

      new YInput({
        type: 'password',
        name: 'oldPassword',
        label: 'Текущий пароль',
        required: true,
        pattern: passwordPattern.source,
        errorText: '8-40 символов, хотя бы 1 цифра, заглавная буква',
        focus: inputEventFocus,
        blur: inputEventBlur
      }).render(),

      new YInput({
        type: 'password',
        name: 'newPassword',
        label: 'Новый пароль',
        required: true,
        pattern: passwordPattern.source,
        errorText: '8-40 символов, хотя бы 1 цифра, заглавная буква',
        focus: inputEventFocus,
        blur: inputEventBlur
      }).render()

    ],
    button: new YButton({
        text: 'Поменять',
        click: {
          fu: changeUserPassword,
          params: ['event']
        }
      }).render()
  }
};

const dialog = new YDialog(context);

export default dialog;
