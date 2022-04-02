interface Props {
  id?: string,
  events?: {
    string: () => void
  },
  state?: {}
};

interface API {
  data: any,
  responseText: string,
  status: number,
  statusText: string
};

interface MessagesAPI {
  userId: number,
  chatId: number,
  token: string,
  callback: {
    onOpen: () => void
    onClose: (event: CloseEvent) => void
    onError: (event: ErrorEvent) => void
    onMessage: (event: MessageEvent) => void
  }
};

interface User {
  id: string,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  avatar: string
};

interface Chats {

};

interface Chat {
  id: string
};

interface SingupFormModel {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

interface SinginFormModel {
  login: string,
  password: string
};

interface UserPasswordFormModel {
  oldPassword: string,
  newPassword: string
};

interface UserDataFormModel {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};

interface DeleteChatFormModel {
  chatId: number
};

interface UserSearchModel {
  login: string
};

interface ChatsParamsModel {
  offset: number,
  limit: number,
  title: string
};

interface CreateChatModel {
  title: string
};

interface ChatUsersModel {
  users: number[],
  chatId: number
};

interface MessageFormModel {
  content?: string,
  type?: string
};

export {
  Props, API, MessagesAPI,

  User, Chats, Chat,

  SingupFormModel, SinginFormModel,

  UserPasswordFormModel, UserDataFormModel, UserSearchModel, DeleteChatFormModel,

  ChatsParamsModel, CreateChatModel, ChatUsersModel,

  MessageFormModel
};
