interface Props {
  id?: string,
  rootString?: string,
  events?: {
    string: () => void
  },
  state?: unknown,
  watchState?: string | string[]
}

interface API {
  data: any,
  response?: string,
  responseText?: string,
  status: number,
  statusText?: string
}

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
}

interface User {
  id: string,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  avatar: string
}

type Chats = unknown[];

interface Chat {
  id: string
}

interface ChatMessage extends Props {
  chat_id: number,
  time: string,
  type: string,
  user_id: number,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }
}

interface SingupFormModel {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

interface SinginFormModel {
  login: string,
  password: string
}

interface UserPasswordFormModel {
  oldPassword: string,
  newPassword: string
}

interface UserDataFormModel {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

interface DeleteChatFormModel {
  chatId: number
}

interface UserSearchModel {
  login: string
}

interface ChatsParamsModel {
  offset: number,
  limit: number,
  title: string
}

interface CreateChatModel {
  title: string
}

interface ChatUsersModel {
  users: number[],
  chatId: number
}

interface MessageFormModel {
  data?: string,
  content?: string,
  type?: string
}

type Indexed<T = unknown> = {
  [key in string]: T;
}

export {
  Props, API, MessagesAPI,

  User, Chats, Chat, ChatMessage,

  SingupFormModel, SinginFormModel,

  UserPasswordFormModel, UserDataFormModel, UserSearchModel, DeleteChatFormModel,

  ChatsParamsModel, CreateChatModel, ChatUsersModel,

  MessageFormModel,

  Indexed
};
