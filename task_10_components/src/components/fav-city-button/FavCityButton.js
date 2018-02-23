import './style.css';
import * as html from '../../utils/html.js';
export default class FavCityButton {
  constructor(host, isFavourite = false) {
    this.state = isFavourite;
    this.uiElements = {
      host: host
    };
    this.render();
  }

  /**
   * Render buttons
   */
  render() {
    const bttnClasses =[
      ['fav-city-button-no', 'btn-frameless', 'btn-round'],
      ['fav-city-button-yes', 'btn-frameless', 'btn-round']
    ];
    bttnClasses[this.state ? 0 : 1].push('fav-city-button-hidden');

    this.uiElements.favCityButtons = [
      html.createElement({
        tag: 'button',
        classList: bttnClasses[0],
        innerHTML: '<i class="material-icons">star_border</i>',
        }),
      html.createElement({
        tag: 'button',
        classList: bttnClasses[1],
        innerHTML: '<i class="material-icons">star</i>',
      }),
    ];
    this.uiElements.favCityButtons[0].addEventListener('click', this.handleSetFavourite.bind(this));
    this.uiElements.favCityButtons[1].addEventListener('click', this.handleUnsetFavourite.bind(this));
    this.uiElements.host.appendChild(this.uiElements.favCityButtons[0]);
    this.uiElements.host.appendChild(this.uiElements.favCityButtons[1]);
  }

  handleSetFavourite(ev) {
    this.uiElements.favCityButtons[0].classList.add('fav-city-button-hidden');
    this.uiElements.favCityButtons[1].classList.remove('fav-city-button-hidden');
    this.emitEvent(true);
  }

  handleUnsetFavourite(ev) {
    this.uiElements.favCityButtons[0].classList.remove('fav-city-button-hidden');
    this.uiElements.favCityButtons[1].classList.add('fav-city-button-hidden');
    this.emitEvent(false);
  }

  emitEvent(isFavourite) {
    this.uiElements.host.dispatchEvent(new CustomEvent('fav-city', {
      detail: { isFavourite: isFavourite },
      bubbles: true,
      cancelable: false,
    }));
  }
}
