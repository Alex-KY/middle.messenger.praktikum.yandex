import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import UserController from '../../../../controllers/UserController';

import YDialog from '../../../../components/YDialog';
import YButton from '../../../../components/YButton';
import YInput from '../../../../components/YInput';
import DialogContent from '../DialogContent';

import { Props as Properties } from '../../../../utils/types';

import "./AvatarDialog.scss";

interface Props extends Properties {
  active?: boolean,
  YDialog?: string
};

const userController = new UserController();

class AvatarDialog extends Block<Props> {
  constructor(props: Props = {}) {
    const concatProps = Object.assign(dialogProps, props);
    context.YDialog = new YDialog(concatProps).render();

    super(context);
  }

  render(): string {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const template = `
  {{ YDialog }}
`;

const context = {
  YDialog: ''
};

function setErrorBlock(form: HTMLElement, text: string) {
  const textItem = form.querySelector('.text') as HTMLElement;

  textItem.textContent = text;
  textItem.classList.toggle('error-text', true);
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

async function sendFile(e: PointerEvent) {
  e.preventDefault();

  const { form } = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const res = await userController.sendAvatar(formData);
  if (res.status === 200) {
    const overlay = document.querySelector('y-dialog.overlay') as HTMLElement;
    overlay.click();
  } else {
    setErrorBlock(form, `${res.status}. ${res.data.reason || 'Ошибка, попробуйте ещё раз'}`);
  }
}

const contentProps = {
  text: '',
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
        fu: sendFile,
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
};

const content = new DialogContent(contentProps);

const dialogProps = {
  title: 'Загрузите файл',
  color: 'text',
  content: content.render()
};

export default AvatarDialog;
