import Router from './utils/router';

import ErrorPage from './views/Error';
import Signin from './views/Signin';
import Signup from './views/Signup';
import Chats from './views/Chats';
import Profile from './views/Profile';

import authController from './controllers/AuthController';

const controller = new authController();

async function ready () {
  await controller.fetchUser();

  const router = new Router();
  router
    .use('/404', ErrorPage, { classes: 'error-page', code: 404 })
    .use('/500', ErrorPage, { classes: 'error-page', code: 500 })
    .use('/signin', Signin, { classes: 'signin-page' })
    .use('/signup', Signup, { classes: 'signup-page' })
    .use('/chats', Chats, { classes: 'chats-page' })
    .use('/profile', Profile, { classes: 'profile-page' })
    .start();

  const user = store.getState('userData');

  if (!user) {
    router.go('/signin');
  } else {
    const page = window.location.pathname.split('/')[1];
    const path = `/${page}`;

    if (['/', '/signin', '/signup'].includes(path)) {
      router.go('/chats');
    } else if (router.getRoute(path)) {
      router.go(path);
    } else {
      router.replace('/404');
    }
  }
}

document.addEventListener('DOMContentLoaded', ready);
