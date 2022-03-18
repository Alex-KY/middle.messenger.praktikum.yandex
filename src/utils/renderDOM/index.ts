export default function(renderedTemplate: string, props: { class: string }) {
  const root = document.querySelector('#root') as HTMLElement;
  const { class: classes } = props;

  if (classes) {
    root.classList.add(classes);
  }

  root.innerHTML = renderedTemplate;
};
