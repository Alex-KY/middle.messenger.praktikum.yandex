interface Props {
  id?: string,
  events?: {
    string: () => void
  }
};

interface API {
  data: any,
  responseText: string,
  status: number,
  statusText: string
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

export {
  Props, API,

  User, Chats, Chat,

  SingupFormModel, SinginFormModel,

  UserPasswordFormModel, UserDataFormModel, UserSearchModel, DeleteChatFormModel,

  ChatsParamsModel, CreateChatModel, ChatUsersModel
};
