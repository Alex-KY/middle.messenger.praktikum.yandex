import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';
import renderDOM from '../../../../utils/renderDOM';

import "./MessagesBlock.scss";

const template = `
  <div class="chat-page__messages-block">
    <!--<div class="chat-page__messages-block__empty">{{ empty }}</div>-->
    <div class="chat-page__messages-block__container">
      <div class="">
        <div></div>
      </div>
    </div>
  </div>
`;

const props = {
  empty: 'Выберите чат чтобы отправить сообщение'
};

export default class MessagesBlock extends Block {
  constructor() {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new MessagesBlock().render();
renderDOM(renderedTemplate);
