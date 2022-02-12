window.template = (function() {
  return `
    <div class="sign-block">
      <p class="title">{{ title }}</p>
      <form class="sign-block__form" onsubmit="return false">
        <div class="sign-block__form__inputs">
          <input type="text" name="{{ inputs.1.name }}" placeholder="{{ inputs.1.placeholder }}" />
          <input type="text" name="{{ inputs.2.name }}" placeholder="{{ inputs.2.placeholder }}" />
        </div>
        <div class="sign-block__form__buttons">
          <button onclick="{{ login }}">{{ buttons.login.text }}</button>
          <a href="/signup">{{ buttons.signup.text }}</a>
        </div>
      </form>
    </div>
  `;
})();

const tmpl = new Templator(window.template);

function login (e) {
  window.location.pathname = '/chat';
}

const context = {
  title: 'Вход',
  inputs: {
    1: {
      placeholder: 'Логин',
      name: 'login'
    },
    2: {
      placeholder: 'Пароль',
      name: 'password'
    }
  },
  buttons: {
    login: {
      text: 'Авторизоваться'
    },
    signup: {
      text: 'Нет аккаунта?'
    }
  },
  login
};

const renderedTemplate = tmpl.compile(context);
const root = document.querySelector('.root');

root.classList = 'root login-page';
root.innerHTML = renderedTemplate;