import Block from '../../../../utils/block';
import Templator from '../../../../utils/templater';

import { Props as Properties } from '../../../../utils/types';

import "./DialogContent.scss";

interface Props extends Properties {
  rootString?: string,
  text?: string,
  buttons: string[],
  input: string
};

class DialogContent extends Block<Props> {
  protected props: Props;

  constructor(props: Props) {
    super(props);
  }

  render(): string {
    const tmpl = new Templator(contentTemplate);
    const props = Object.assign({}, this.props, { id: this.id })
    return tmpl.compile(props);
  }
};

const contentTemplate = `
  <form id="{{ id }}" name="avatar-form" class="avatar__form">
    <span class="text">{{ text }}</span>
    {{ #each buttons }}
    {{ input }}
  </form>
`;

export default DialogContent;
