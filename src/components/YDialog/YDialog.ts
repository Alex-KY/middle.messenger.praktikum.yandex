import Block from '../../utils/block';
import Templator from '../../utils/templater';

import { nanoid } from 'nanoid';

import './YDialog.scss';

import { Props as Properties } from '../../utils/types';

const id = nanoid(6);

function hideDialog (e: PointerEvent) {
  const target = e.target as HTMLInputElement;
  if (!target.classList.contains('overlay')) return

  const yDialog = document.getElementById(id);
  yDialog?.classList.toggle('y-dialog--active', false);
}

interface Props extends Properties {
  active?: boolean,
  class?: string,
  title?: string,
  color?: string,
  content?: string
};

export default class YDialog extends Block<Props> {
  public id = id;

  constructor(props: Props) {
    const concatProps = Object.assign(props, { hideDialog });
    super(concatProps);
  }

  render(): string {
    const {active, class: classes, title, color, content} = this.props;
    const template = `
      <div
        id="${this.id}"
        class="y-dialog overlay ${active ? `y-dialog--active` : ''}"
        onclick="{{hideDialog}}(event)"
      >
        <div class="y-dialog ${classes || ''}">
          <div class="y-dialog__title title ${color ? `${color}-color` : ''}">
            ${title || ''}
          </div>
          <div class="y-dialog__content">
            ${content || ''}
          </div>
        </div>
      </div>
    `;

    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
