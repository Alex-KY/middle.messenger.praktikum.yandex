// Динамический импорт
const pages = {
  'login': async function () {
    await import('./views/Login');
  },
  'signup': async function () {
    await import('./views/Signup');
  },
  'chat': async function () {
    await import('./views/Chat');
  },
  'profile': async function () {
    await import('./views/Profile');
  },
  '404': async function () {
    await import('./views/404');
  },
  '500': async function () {
    await import('./views/500');
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
