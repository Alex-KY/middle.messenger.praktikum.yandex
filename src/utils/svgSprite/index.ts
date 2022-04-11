import arrow from '/static/icons/arrow.svg';
import clip from '/static/icons/clip.svg';
import plus from '/static/icons/plus.svg';
import deleteIcon from '/static/icons/delete.svg';
import checkDouble from '/static/icons/check-double.svg';
import ellipsisVert from '/static/icons/ellipsis-vert.svg';
import image from '/static/icons/image.svg';

export default function initSVG () {
  const url = arrow.url.split('#')[0];
  const sprite: string = `
    <img hidden src="${url}">
  `;
  const root = document.querySelector('body');
  if (!root) return;
  root.innerHTML = root?.innerHTML + sprite;
}

export const icons = {
  arrow: `<svg viewBox="${arrow.viewBox}"><use xlink:href="${arrow.url}"></use></svg>`,
  clip: `<svg viewBox="${clip.viewBox}"><use xlink:href="${clip.url}"></use></svg>`,
  plus: `<svg viewBox="${plus.viewBox}"><use xlink:href="${plus.url}"></use></svg>`,
  delete: `<svg viewBox="${deleteIcon.viewBox}"><use xlink:href="${deleteIcon.url}"></use></svg>`,
  checkDouble: `<svg viewBox="${checkDouble.viewBox}"><use xlink:href="${checkDouble.url}"></use></svg>`,
  ellipsisVert: `<svg viewBox="${ellipsisVert.viewBox}"><use xlink:href="${ellipsisVert.url}"></use></svg>`,
  image: `<svg viewBox="${image.viewBox}"><use xlink:href="${image.url}"></use></svg>`,
}
