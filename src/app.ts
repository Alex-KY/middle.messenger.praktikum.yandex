import Router from './utils/router';

import ErrorPage from './views/Error';
import Login from './views/Login';
import Signup from './views/Signup';
import Chat from './views/Chat';
import Profile from './views/Profile';

// const pages = {
//   'login': async function () {
//     await import('./views/Login');
//   },
//   'signup': async function () {
//     await import('./views/Signup');
//   },
//   'chat': async function () {
//     await import('./views/Chat');
//   },
//   'profile': async function () {
//     await import('./views/Profile');
//   },
//   '404': async function () {
//     await import('./views/404');
//   },
//   '500': async function () {
//     await import('./views/500');
//   }
// };

// Роутинг
// Стартовая страница - /login
// Если страница не найдена - /404
async function ready () {
  const router = new Router();

  router
    .use('/404', ErrorPage, { classes: 'error-page', code: 404 })
    .use('/500', ErrorPage, { classes: 'error-page', code: 500 })
    .use('/login', Login, { classes: 'login-page' })
    .use('/signup', Signup, { classes: 'signup-page' })
    .use('/chat', Chat, { classes: 'chat-page' })
    .use('/profile', Profile, { classes: 'profile-page' })
    .start();

  if (window.location.pathname === '/') {
    router.go('/login');
  } else {
    const page = window.location.pathname.split('/')[1];
    const path = `/${page}`;

    if (router.getRoute(path)) {
      router.go(path);
    } else {
      router.replace('/404');
    }
  }
}

document.addEventListener('DOMContentLoaded', ready);
