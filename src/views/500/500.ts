import Templator from '../../utils/templater/index';

const template = `
  <div class="error-page__block">
    <p class="big-title">500</p>
    <p class="title">{{ text }}</p>
    <a class="small-text link-text" href="/">Назад к чатам</a>
  </div>
`;

const tmpl = new Templator(template);

const context = {
  text: 'Мы уже фиксим'
};

export default (function () {
  const renderedTemplate = tmpl.compile(context);
  const root = document.querySelector('.root') as any;

  root.classList = 'root error-page';
  root.innerHTML = renderedTemplate;
})();
