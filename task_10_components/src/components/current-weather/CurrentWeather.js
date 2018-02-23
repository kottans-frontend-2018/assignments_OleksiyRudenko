import './style.css';
import * as html from "../../utils/html.js";
import WeatherIcon from '../weather-icon/WeatherIcon.js';
import WindDirection from '../wind-direction/WindDirection.js';
import FavCityButton from '../fav-city-button/FavCityButton.js';

export default class CurrentWeather {
  /**
   * @constructor
   * @param {object} currentWeather
   */
  constructor(currentWeather) {
    this.state = currentWeather;
    this.state.wind.units = this.state.currentUnits === 'metric' ? 'm/s' : 'mph';
    if (!this.state.city || !this.state.country) {
      this.state.city = this.state.coord.lat;
      this.state.country = this.state.coord.lon;
      this.state.coord = null;
    }

    this.uiElements = {
      host: html.createElement({
        tag: 'div',
        id: 'current-weather-container',
      })
    };
    this.components = {};
    console.log('CurrentWeather state:');
    console.log(this.state);
    this.render();
  }

  /**
   * Renders component
   */
  render() {
    const weatherIcon = new WeatherIcon(this.state.skies);
    const windDirection = new WindDirection(this.state.wind.deg);

    const favCityButtonContainer = html.createElement({ tag: 'div', id: 'fav-city-button-container' });
    const cityLocation = html.createElement({ tag: 'div' });
    cityLocation.innerHTML = `
        <div class="current-weather-location">${this.state.city},${this.state.country}</div>
        <div class="current-weather-geocoord">${this.state.coord ? this.state.coord.lat + ',' + this.state.coord.lon : ''}</div>
        `;
    const locationBlock = html.createElement({ tag: 'div', classList: ['current-weather-row'] });
    locationBlock.appendChild(favCityButtonContainer);
    locationBlock.appendChild(cityLocation);
    this.uiElements.host.appendChild(locationBlock);

    const weatherBlock = html.createElement({ tag: 'div', classList: ['current-weather-row'] });
    weatherBlock.innerHTML = `
      <div class="current-weather-row">
          <div class="current-weather-column">
              <div class="current-weather-item">
                  <div class="current-weather-header"><i class="wi wi-strong-wind wi-fw"></i></div>
                  <div class="current-weather-data">${this.state.wind.speed}</div>
                  <div class="current-weather-data">${this.state.wind.units}</div>
                  <div class="">${windDirection.render()}</div>
              </div>
              <div class="current-weather-item">
                  <div class="current-weather-header"><i class="wi wi-humidity wi-fw"></i></div>
                  <div class="current-weather-data">${this.state.humidity}</div>
                  <div class="current-weather-data">%</div>
              </div>
              <div class="current-weather-item">
                  <div class="current-weather-header"><i class="wi wi-barometer wi-fw"></i></div>
                  <div class="current-weather-data">${this.state.pressure}</div>
                  <div class="current-weather-data">atm</div>
              </div>
          </div>
          <div class="current-weather-row-nowrap">
              <div class="current-weather-main-item current-weather-icon">${weatherIcon.render()}</div>
              <div class="current-weather-column">
                  <div class="current-weather-row">
                      <div class="current-weather-temp">${this.state.temp}</div>
                      <div id="unit-switch" class="unit-switch" title="Switch me!">
                          <button class="btn-frameless btn-unit-switch" type="button">
                              <i class="wi wi-celsius"></i>
                          </button>
                          <button class="btn-frameless btn-unit-switch" type="button">
                              <i class="wi wi-fahrenheit"></i>
                          </button>
                      </div>
                  </div>
                  <div class="current-weather-descr-main">${this.state.condition}</div>
                  <div class="current-weather-descr-extended">${this.state.description}</div>
              </div>
          </div>
      </div>
    `;
    this.uiElements.host.appendChild(weatherBlock);
    console.log('Observing...');
    this.components.FavCityButton = new FavCityButton(favCityButtonContainer, this.state.isFavourite);
  }
}
