import Block from '../../utils/block';
import Templator from '../../utils/templater';
import renderDOM from '../../utils/renderDOM';
import LeftSide from './components/LeftSide';
import MessagesBlock from './components/MessagesBlock';

import "./Chat.scss";

const template = `
  {{ LeftSide }}
  {{ MessageBlock }}
`;

const props = {
  LeftSide: new LeftSide().render(),
  MessageBlock: new MessagesBlock().render()
};

export default class Chat extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};

const renderedTemplate = new Chat(props).render();
renderDOM(renderedTemplate, {class: 'chat-page'});
