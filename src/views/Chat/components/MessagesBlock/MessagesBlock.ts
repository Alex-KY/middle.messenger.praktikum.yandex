import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import "./MessagesBlock.scss";

const template = `
  <div class="messages-block">
    <!--<div class="messages-block__empty">{{ empty }}</div>-->
    <div class="messages-block__header">
      <div class="user">
        <div class="user__avatar"></div>
        <div class="user__name">{{ header.user }}</div>
      </div>
      {{ #each header.components }}
    </div>
    <div class="messages-block__messages">
      <p class="messages-block__messages__date">{{ messages[0].date }}</p>
      {{ #each messages[0].messages }}
    </div>
    <form class="messages-block__footer" onsubmit="return false">
      {{ #each footer.components }}
    </div>
  </div>
`;

export default class MessagesBlock extends Block {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
};
