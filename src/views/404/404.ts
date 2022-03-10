import Templator from '../../utils/templater/index';

const template = `
  <div class="error-page__block">
    <p class="big-title">404</p>
    <p class="title">{{ text }}</p>
    <a class="small-text link-text" href="/">Назад к чатам</a>
  </div>
`;

const tmpl = new Templator(template);

const context = {
  text: 'Не туда попали'
};

export default (function () {
  const renderedTemplate = tmpl.compile(context);
  const root = document.querySelector('.root') as HTMLElement;

  root.classList = 'root error-page';
  root.innerHTML = renderedTemplate;
})();
