import Block from '../../utils/block';
import Templator from '../../utils/templater';

import './YDialog.scss';

import { Props as Properties } from '../../utils/types';

interface Props extends Properties {
  active?: boolean,
  class?: string,
  title?: string,
  color?: string,
  content?: {
    template: string
  }
}

export default class YDialog extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  public hide(e?: PointerEvent) {
    const target = (e ? e.target : document.getElementById(this.id)) as HTMLElement;

    if (!target.classList.contains('overlay')) return;

    target.classList.toggle('y-dialog--active', false);
  }

  public render(): string {
    const {active, class: classes, title, color} = this.props;
    const contentTemplate = this.props.content?.template || '';

    window[`hide-dialog__${this.id}`] = this.hide;

    const template = `
      <div
        id="${this.id}"
        class="y-dialog overlay ${active ? `y-dialog--active` : ''}"
        onclick="window['hide-dialog__${this.id}'](event)"
      >
        <div class="y-dialog ${classes || ''}">
          <div class="y-dialog__title title ${color ? `${color}-color` : ''}">
            ${title || ''}
          </div>
          <div class="y-dialog__content">
            ${contentTemplate}
          </div>
        </div>
      </div>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
