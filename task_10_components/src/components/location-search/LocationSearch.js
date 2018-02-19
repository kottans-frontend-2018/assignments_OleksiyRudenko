import * as html from '../../utils/html.js';
import './style.css';

export default class LocationSearch {
  constructor() {
    this.uiElements = {
      form: html.createElement({
        tag: 'form',
        id: 'location-search-form',
        attr: {
          autocomplete: 'off',
        },
      })
    };
    this.render();
  }

  /**
   * Builds required HTML elements and binds event listeners
   */
  render() {
    this.uiElements.textInput = html.createElement({
      tag: 'input',
      id: 'location-search-text-input',
      attr: {
        required: '',
        type: 'text',
        name: 'location-search-text',
        minlength: 3,
        maxlength: 20,
        inputmode: 'verbatim',
        placeholder: 'Kyiv | 50.2,30.1',
        title: 'Tap me and type!',
      },
      classList: 'location-search-text-input',
    });
    this.uiElements.textInputWrapper = html.createElement({
      tag: 'div',
      classList: 'location-search-input-container',
      children: this.uiElements.textInput,
    });
    this.uiElements.searchButton = html.createElement({
      tag: 'button',
      id: 'location-search-action',
      attr: {
        type: 'button',
        title: 'Get weather info',
        disabled: '',
      },
      classList: ['btn-frameless', 'btn-round', 'location-search-btn'],
    });
    this.uiElements.searchButton.innerHTML = '<i class="material-icons">search</i>';
    this.uiElements.form.appendChild(this.uiElements.textInputWrapper);
    this.uiElements.form.appendChild(this.uiElements.searchButton);

    /*
    this.uiElements.form.innerHTML = `
        <div class="location-search-input-container">
          <input
            required
            id="location-search-text-input"
            name="location-search-text"
            type="text"
            class="location-search-text-input"
            minlength="3"
            maxlength="20"
            inputmode="verbatim"
            placeholder="Kyiv | 50.2,30.1"
            title="Tap me and type!"
          />
        </div>
        <button id="location-search-action"
            class="btn-frameless btn-round location-search-btn"
            title="Get weather info"
            type="button"
            disabled>
          <i class="material-icons">search</i>
        </button>`;
    this.uiElements.textInput = document.getElementById('location-search-text-input');
    this.uiElements.searchButton = document.getElementById('location-search-action'); */
    // console.log(this.uiElements);
    this.uiElements.textInput.addEventListener('input', this.handleUserInput.bind(this));
  }

  /**
   * Handles user input
   * @param {Event} ev
   */
  handleUserInput(ev) {
    this.uiElements.searchButton.disabled = ev.target.value.length < 3;
  }
}
