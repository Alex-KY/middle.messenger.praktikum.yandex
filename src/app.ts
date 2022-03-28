import Router from './utils/router';

import ErrorPage from './views/Error';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Chat from './views/Chat';
import Profile from './views/Profile';

import authController from './controllers/AuthController';

// Delete
import store from './utils/store';
window.store = store;
//

const controller = new authController();
// const pages = {
//   'signin': async function () {
//     await import('./views/Signin');
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
// Стартовая страница - /signin
// Если страница не найдена - /404
async function ready () {
  const router = new Router();
  const user = await controller.fetchUser();

  router
    .use('/404', ErrorPage, { classes: 'error-page', code: 404 })
    .use('/500', ErrorPage, { classes: 'error-page', code: 500 })
    .use('/signin', Signin, { classes: 'signin-page' })
    .use('/signup', Signup, { classes: 'signup-page' })
    .use('/chat', Chat, { classes: 'chat-page' })
    .use('/profile', Profile, { classes: 'profile-page' })
    .start();

  if (!user) {
    router.go('/signin');
  } else {
    const page = window.location.pathname.split('/')[1];
    const path = `/${page}`;

    if (['/', '/signin', '/signup'].includes(path)) {
      router.go('/chat');
    }

    if (router.getRoute(path)) {
      router.go(path);
    } else {
      router.replace('/404');
    }
  }
}

document.addEventListener('DOMContentLoaded', ready);
