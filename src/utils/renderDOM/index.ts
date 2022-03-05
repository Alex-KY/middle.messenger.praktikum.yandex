export default function(renderedTemplate: string, props: any = {}) {
  const root = document.querySelector('.root') as any;
  const { class: classes } = props;

  if (classes) {
    root.classList = `${root.classList} ${classes}`;
  }

  root.innerHTML = renderedTemplate;
};