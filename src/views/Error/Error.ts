import Block from '../../utils/block';
import Templator from '../../utils/templater';

import { Props as Properties } from '../../utils/types';

import "./Error.scss";

const template = `
  <div class="error-page__block">
    <p class="big-title">{{ code }}</p>
    <p class="title">{{ text }}</p>
    <a class="small-text link-text" href="/">Назад к чатам</a>
  </div>
`;

const context = [
  {
    code: 404,
    text: 'Не туда попали'
  },
  {
    code: 500,
    text: 'Мы уже фиксим'
  }
];

interface Props extends Properties {
  code: number
}

export default class ErrorPage extends Block<Props> {
  constructor(props: Props) {

    const errorContext = context.find(({ code }) => code === props.code);
    const concatProps = Object.assign(props, errorContext);

    super(concatProps);
    this.props = concatProps;
  }

  render() {
    const tmpl = new Templator(template);
    return tmpl.compile(this.props);
  }
}
