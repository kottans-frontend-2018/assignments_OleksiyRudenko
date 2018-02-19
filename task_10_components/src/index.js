import App from './components/app/App.js';

/**
 * App JS entry point
 */
const appContainer = document.getElementById(
  document.getElementById('entry-script').getAttribute('data-app-container')
);

window.app = new App(appContainer);
