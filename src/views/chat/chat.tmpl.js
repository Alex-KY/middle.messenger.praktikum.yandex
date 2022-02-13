const template = `
  <img class="chat-page__fake-image" src="{{ img }}" />
  <div class="chat-page__link-block">
    <a class="link-text gray-text" href="/profile">{{ profile }}</a>
  </div>
`;

const tmpl = new Templator(template);

const img = document.querySelector('img.chat').attributes.src.value;

const context = {
  img: img,
  profile: 'Профиль >'
};

const renderedTemplate = tmpl.compile(context);
const root = document.querySelector('.root');

root.classList = 'root chat-page';
root.innerHTML = renderedTemplate;