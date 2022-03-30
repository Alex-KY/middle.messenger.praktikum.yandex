import ChatsController from '../../../../controllers/ChatsController';
import UserController from '../../../../controllers/UserController';

import YDialog from '../../../../components/YDialog';
import YButton from '../../../../components/YButton';
import YInput from '../../../../components/YInput';

import "./CreateChatDialog.scss";

const chatsController = new ChatsController();
const userController = new UserController();

function setErrorBlock (text?: string) {
  const errorBlock = document.querySelector('.create-chat__form__response-error');
  if (errorBlock) {
    errorBlock.textContent = text || '';
    errorBlock.classList.toggle('error--active', Boolean(text));
  }
}

async function createChat(e: PointerEvent) {
  e.preventDefault();
  setErrorBlock();

  const { form } = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const formObject: any = [...formData.entries()]
    .reduce((accum, [key, value]) => Object.assign(accum, { [key]: value }), {});

  let res = await userController.searchUser(formObject)

  if (res.status === 200 && res.data?.length > 0) {
    const { first_name, second_name, id } = res.data[0];
    const title = `${second_name} ${first_name}`;

    res = await chatsController.createChat({ title });

    if (res.status === 200 && res.data?.id) {
      const { id: chatId } = res.data;
      const newChat = { users: [id], chatId };

      res = await chatsController.setChatUsers(newChat);
      console.warn(res)
    }
  }

  if (res.status === 200) {
    dialog.hide();
  } else {
    const status = res.status ? `${res.status}. ` : ``;
    setErrorBlock(`${status}${res.data?.reason || 'Неизвестная ошибка'}`);
  }
}

function checkField(e: Event) {
  const type = e.type as string;
  const target = e.target as HTMLInputElement;
  const targetLabel = target.parentNode?.querySelector('.y-label');
  const labelActive = type === 'focus' || (type === 'blur' && !!target.value);
  targetLabel?.classList.toggle('y-label--active', labelActive);
}

const template = `
  <form class="create-chat__form">
    <div class="create-chat__form__inputs">
      {{ #each content.inputs }}
    </div>
    <div class="create-chat__form__buttons">
      {{ content.button }}
    </div>
    <div class="create-chat__form__response-error"></div>
  </form>
`;

const context = {
  title: 'Добавить пользователя',
  content: {
    template,
    inputs: [

      new YInput({
        name: 'login',
        label: 'Логин',
        focus: {
          fu: checkField,
          params: ['event']
        },
        blur: {
          fu: checkField,
          params: ['event']
        },
        required: true
      }).render()

    ],
    button: new YButton({
        text: 'Добавить',
        click: {
          fu: createChat,
          params: ['event']
        }
      }).render()
  }
};

const dialog = new YDialog(context);

export default dialog;
