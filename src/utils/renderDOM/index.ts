export default function(renderedTemplate: string, rootString: string = '#root') {
  const root = document.querySelector(rootString) as HTMLElement;

  root.innerHTML = renderedTemplate;
};
