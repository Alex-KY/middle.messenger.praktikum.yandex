import { assert } from "chai";
const sinon = require("sinon");

import AuthAPI from "./AuthAPI";

import { baseApiUrl } from "../HTTPTransport";

const api = new AuthAPI();

describe("Тестирование AuthAPI", () => {
  let requests = [];

  beforeEach(() => {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

    global.XMLHttpRequest.onCreate = request => {
      requests.push(request);
    };
  });

  afterEach(() => {
    global.XMLHttpRequest.restore();
    requests = [];
  });

  describe("Тестирование логаута", () => {

    it("Наличие запроса", () => {
      api.logout();

      assert.equal(requests.length, 1);
    });

    it("Необходимый метод", () => {
      api.logout();

      const request = requests[0];

      assert.equal(request.method, 'POST');
    });

    it("Корректный адрес", () => {
      api.logout();

      const request = requests[0];

      assert.equal(request.url, `${baseApiUrl}/auth/logout`);
    });

    it("Наличие заголовков", () => {
      api.logout();

      const request = requests[0];

      assert.deepEqual(request.requestHeaders, { credentials: 'include', mode: 'cors' });
    });

  });

  describe("Тестирование авторизации", () => {
    const data = {
      login: "testtest",
      password: "Test1234"
    };

    it("Наличие запроса", () => {
      api.signin(data);

      assert.equal(requests.length, 1);
    });

    it("Необходимый метод", () => {
      api.signin(data);
      const request = requests[0];

      assert.equal(request.method, 'POST');
    });

    it("Корректный адрес", () => {
      api.signin(data);
      const request = requests[0];

      assert.equal(request.url, `${baseApiUrl}/auth/signin`);
    });

    it("Наличие заголовков", () => {
      api.signin(data);
      const request = requests[0];

      assert.deepEqual(request.requestHeaders, { credentials: 'include', mode: 'cors' });
    });

  });

  describe("Тестирование регистрации", () => {
    const data = {
      first_name: "Тест",
      second_name: "Тестов",
      login: "testtest",
      email: "email-test@test.com",
      password: "Test1234",
      phone: "1234567890"
    };

    it("Наличие запроса", () => {
      api.signup(data);

      assert.equal(requests.length, 1);
    });

    it("Необходимый метод", () => {
      api.signup(data);
      const request = requests[0];

      assert.equal(request.method, 'POST');
    });

    it("Корректный адрес", () => {
      api.signup(data);
      const request = requests[0];

      assert.equal(request.url, `${baseApiUrl}/auth/signup`);
    });

    it("Наличие заголовков", () => {
      api.signup(data);
      const request = requests[0];

      assert.deepEqual(request.requestHeaders, { credentials: 'include', mode: 'cors' });
    });

  });

  describe("Тестирование запроса информации о пользователе", () => {

    it("Наличие запроса", () => {
      api.fetchUser();

      assert.equal(requests.length, 1);
    });

    it("Необходимый метод", () => {
      api.fetchUser();
      const request = requests[0];

      assert.equal(request.method, 'GET');
    });

    it("Корректный адрес", () => {
      api.fetchUser();
      const request = requests[0];

      assert.equal(request.url, `${baseApiUrl}/auth/user`);
    });

    it("Наличие заголовков", () => {
      api.fetchUser();
      const request = requests[0];

      assert.deepEqual(request.requestHeaders, { credentials: 'include', mode: 'cors' });
    });

  });

});
