window.blockTemplate = (function() {
  return `
<!-- Можно {{}} с пробелами, можно без-->
<div class="{{ className }}">
        <span onClick="{{ handleClick }}">{{text}}</span>
        <span>{{ user.info.firstName }}</span>
</div>
`;
})();

const tmpl = new Templator(window.blockTemplate);

const context = {
  text: 'Мой очень важный span',
  className: 'chats',
  user: {
    info: {
      firstName: 'Alexander'
    }
  },
  handleClick: function() {
    console.log(document.body);
  }
};

const renderedTemplate = tmpl.compile(context); // Строка с html-вёрсткой
/*
<!-- Можно {{}} с пробелами, можно без-->
<div class="chats">
    <span onClick="window.handleClick()">Мой очень важный span</span>
    <span>Alexander</span>
</div>
*/

const root = document.querySelector('.root');
root.innerHTML = `
<p>Результат после нажатия виден в консоли</p>
${renderedTemplate}
`;