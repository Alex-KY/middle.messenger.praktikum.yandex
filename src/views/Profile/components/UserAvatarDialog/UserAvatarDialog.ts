import UserController from '../../../../controllers/UserController';

import YDialog from '../../../../components/YDialog';
import YButton from '../../../../components/YButton';
import YInput from '../../../../components/YInput';

import "./UserAvatarDialog.scss";

const userController = new UserController();

function setErrorBlock (text?: string) {
  const errorBlock = document.querySelector('.user-avatar__form__response-error');
  if (errorBlock) {
    errorBlock.textContent = text || '';
    errorBlock.classList.toggle('error--active', Boolean(text));
  }
}

function clickOnFileInput(e: PointerEvent) {
  const target = e.target as HTMLInputElement;
  const fileInput = target.offsetParent?.querySelector('[name=avatar]') as HTMLInputElement;

  fileInput.click();
}

function changeFile(e: PointerEvent) {
  const target = e.target as HTMLInputElement;
  const fileName = target.files?.[0]?.name as string;
  const form = target.form;

  form?.classList.toggle('file--changed', Boolean(fileName.length));

  const text = form?.querySelector('.text') as HTMLElement;
  text.textContent = fileName;
}

async function changeUserAvatar(e: PointerEvent) {
  e.preventDefault();

  const { form } = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const res = await userController.changeUserAvatar(formData);
  if (res.status === 200) {
    dialog.hide();
  } else {
    const status = res.status ? `${res.status}. ` : ``;
    setErrorBlock(`${status}${res.data?.reason || 'Неизвестная ошибка'}`);
  }
}

const template = `
  <form class="user-avatar__form">
    <div class="user-avatar__form__buttons">
      <span class="text"></span>
      {{ #each content.buttons }}
    </div>
    <div class="user-avatar__form__inputs">
      {{ content.input }}
    </div>
    <div class="user-avatar__form__response-error"></div>
  </form>
`;

const context = {
  title: 'Загрузите файл',
  content: {
    template,
    buttons: [

      new YButton({
        text: 'Выбрать файл на компьютере',
        textUnderline: true,
        click: {
          fu: clickOnFileInput,
          params: ['event']
        },
        tagName: 'span',
        class: 'y-btn--link'
      }).render(),

      new YButton({
        text: 'Поменять',
        click: {
          fu: changeUserAvatar,
          params: ['event']
        },
        width: '100%'
      }).render()

    ],
    input: new YInput({
        name: 'avatar',
        type: 'file',
        accept: 'image/jpeg,image/png,image/gif',
        required: true,
        change: {
          fu: changeFile,
          params: ['event']
        },
        class: 'hidden'
      }).render()
  }
};

const dialog = new YDialog(context);

export default dialog;
