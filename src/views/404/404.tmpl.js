window.template = (function() {
  return `
    <div class="error-page__block">
      <p class="big-title">404</p>
      <p class="title">{{ text }}</p>
      <a class="small-text link-text" href="/">Назад к чатам</a>
    </div>
  `;
})();

const tmpl = new Templator(window.template);

const context = {
  text: 'Не туда попали'
};

const renderedTemplate = tmpl.compile(context);
const root = document.querySelector('.root');

root.classList = 'root error-page';
root.innerHTML = renderedTemplate;