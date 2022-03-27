interface Props {
  id?: string,
  events?: { string: () => void }
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

interface userPasswordFormModel {
  oldPassword: string,
  newPassword: string
};

export { Props, API, User, SingupFormModel, SinginFormModel, userPasswordFormModel };
