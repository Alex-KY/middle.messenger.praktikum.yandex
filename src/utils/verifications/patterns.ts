const loginPattern = /^(?=.*[a-zA-Z])[a-zA-Z\d_-]{2,19}[a-zA-Z\d]$/g;
const namePattern = /([A-Z]{1}[a-zA-Z-]{1,98}[a-zA-Z]{1})|([А-Я]{1}[а-яА-Я-]{1,98}[а-яА-Я]{1})/g;
const emailPattern = /^(?=.*[a-zA-Z])[a-zA-Z\d-]{2,}@[a-zA-Z]{2,}.[a-zA-Z]{2,3}$/g;
const phonePattern = /\+?[0-9]{8,15}/g;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/g;

export {
  loginPattern,
  namePattern,
  emailPattern,
  phonePattern,
  passwordPattern
};
