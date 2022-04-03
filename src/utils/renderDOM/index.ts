export default function(renderedTemplate: string, rootString = '#root') {
  const root = document.querySelector(rootString) as HTMLElement;

  root.innerHTML = renderedTemplate;
}
