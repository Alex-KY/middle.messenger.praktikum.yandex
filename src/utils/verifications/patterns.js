const loginPattern = /^((?=.*[a-zA-Z])[a-zA-Z\d_-]{1,}){3,20}[a-zA-Z\d]$/g;
const namePattern = /([A-Z]{1}[a-zA-Z-]{1,98}[a-zA-Z]{1})|([А-Я]{1}[а-яА-Я-]{1,98}[а-яА-Я]{1})/g;
const emailPattern = /^(?=.*[A-Za-z])[A-Za-z\d-]@[a-zA-Z]{2,}.[a-zA-Z]{2,3}$/g;
const phonePattern = /\+?[0-9]{8,15}/g;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/g;

export {
  loginPattern,
  namePattern,
  emailPattern,
  phonePattern,
  passwordPattern
};
