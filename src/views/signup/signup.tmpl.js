const template = `
  <div class="sign-block">
    <p class="title">{{ title }}</p>
    <form class="sign-block__form">
      <div class="sign-block__form__inputs">
        <input type="text" name="{{ inputs.1.name }}" placeholder="{{ inputs.1.placeholder }}" />
        <input type="text" name="{{ inputs.2.name }}" placeholder="{{ inputs.2.placeholder }}" />
        <input type="text" name="{{ inputs.3.name }}" placeholder="{{ inputs.3.placeholder }}" />
        <input type="text" name="{{ inputs.4.name }}" placeholder="{{ inputs.4.placeholder }}" />
        <input type="text" name="{{ inputs.5.name }}" placeholder="{{ inputs.5.placeholder }}" />
        <input type="text" name="{{ inputs.6.name }}" placeholder="{{ inputs.6.placeholder }}" />
        <input type="text" name="{{ inputs.7.name }}" placeholder="{{ inputs.7.placeholder }}" />
      </div>
      <div class="sign-block__form__buttons">
        <button type="submit">{{ buttons.login.text }}</button>
        <a href="/login">{{ buttons.link.text }}</a>
      </div>
    </form>
  </div>
`;

const tmpl = new Templator(template);

const context = {
  title: 'Регистрация',
  inputs: {
    1: {
      name: 'email',
      placeholder: 'Почта'
    },
    2: {
      name: 'login',
      placeholder: 'Логин'
    },
    3: {
      name: 'first_name',
      placeholder: 'Имя'
    },
    4: {
      name: 'second_name',
      placeholder: 'Фамилия'
    },
    5: {
      name: 'phone',
      placeholder: 'Телефон'
    },
    6: {
      name: 'password',
      placeholder: 'Пароль'
    },
    7: {
      name: 'password',
      placeholder: 'Пароль (ещё раз)'
    }
  },
  buttons: {
    login: {
      text: 'Зарегистрироваться'
    },
    link: {
      text: 'Войти'
    }
  }
};

const renderedTemplate = tmpl.compile(context);
const root = document.querySelector('.root');

root.classList = 'root signup-page';
root.innerHTML = renderedTemplate;