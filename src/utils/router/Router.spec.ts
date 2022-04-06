import { assert } from 'chai';
const sinon = require("sinon");

import Block from '../block';
import Templator from '../templater';

import { Props } from '../types';

import Router from '../router';

const TEMPLATE = `<div>{{ word }}</div>`;

class PageBlock extends Block<Props> {
  constructor(props: Props = {}) {
    super(props);
  }

  render(): string {
    const tmpl = new Templator(TEMPLATE);
    return tmpl.compile(this.props);
  }
}

const router = new Router();

describe('Тестирование роутера', () => {
  describe('Тестирование функций роутера', () => {
    it("Функции use & getRoutes", () => {
      router.use('/profile', PageBlock, { classes: 'profile-page' });

      assert.equal(router.getRoutes().length, 1);
    });

    it("Функция getRoute", () => {
      router.use('/profile', PageBlock, { classes: 'profile-page' });
      const route = router.getRoute('/profile');

      assert.isObject(route);
    });

    it("Функции start & go", () => {
      router
        .use('/profile', PageBlock, { classes: 'profile-page' })
        .use('/signin', PageBlock, { classes: 'signin-page' })
        .use('/signup', PageBlock, { classes: 'signup-page' })
        .start();
      router.go('/signin');
      router.go('/profile');

      assert.equal(window.location.pathname, '/profile');
    });

    it("Функция back", () => {
      const spy = sinon.spy(global.window.history, "back");
      router.back();

      assert.equal(spy.callCount, 1);
    });

    it("Функция forward", () => {
      const spy = sinon.spy(global.window.history, "forward");
      router.forward();

      assert.equal(spy.callCount, 1);
    });

    it("Функция replace", () => {
      router.replace('/signup');

      assert.equal(window.location.pathname, '/signup');
    });
  });

  describe('Тестирование инициализации', () => {
    it("Это тот же самый роутер", () => {
      assert.deepEqual(router, new Router());
    });
  });

});
