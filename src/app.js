// Инициализируем шаблонизатор
import './utils/templater/index.js';

// Динамический импорт
const pages = {
  'login': async function () {
    await import('./views/login/login.tmpl');
  },
  'signup': async function () {
    await import('./views/signup/signup.tmpl');
  },
  'chat': async function () {
    await import('./views/chat/chat.tmpl');
  },
  'profile': async function () {
    await import('./views/profile/profile.tmpl');
  },
  '404': async function () {
    await import('./views/404/404.tmpl');
  },
  '500': async function () {
    await import('./views/500/500.tmpl');
  }
};

// Роутинг
// Стартовая страница - /login
// Если страница не найдена - /404
async function ready () {
  if (window.location.pathname === '/') {
    window.location.href = `${window.location.origin}/login`;
  } else {
    const page = window.location.pathname.split('/')[1];
    if (!page || !Object.keys(pages).includes(page)) {
      pages['404']();
    } else {
      pages[page]();
    }
  }
};

document.addEventListener('DOMContentLoaded', ready);
