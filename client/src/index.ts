import './index.html';
import { App } from './app';

window.onload = () => {
  document.location.hash = '';
  const mainElement = document.querySelector('.app');
  if (!mainElement) {
    throw new Error('The element not found!');
  }
  const app = new App(mainElement);
  app.start();

  window.onpopstate = () => {
    const location = window.location.hash;
    if (location) {
      app.render(location);
    }
  };
};
