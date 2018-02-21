import LocationSearch from '../location-search/LocationSearch.js';
import WeatherApi from '../open-weather-map-api/OpenWeatherMapAPI.js'
import * as html from '../../utils/html.js';
import './style.css';

export default class App {
  /**
   * Bootstraps and launches application
   * @param {HTMLElement} containerElement
   */
  constructor(containerElement) {
    this.uiElements = {
      parent : containerElement,
      host: html.createElement({
        tag: 'div',
        id: 'app-container',
      }),
    };
    this.components = {
      LocationSearch: new LocationSearch(),
      WeatherApi: new WeatherApi('0f034f0e9216aaa8ed94c3d87af01e18'),
    };
    this.config = {
      units: 'metric',
    };
    this.render();
  }

  /**
   * Renders application and its components
   */
  render() {
    this.uiElements.host.appendChild(this.components.LocationSearch.uiElements.host);
    this.uiElements.host.addEventListener('location-search', this.handleLocationSearch.bind(this));
    this.uiElements.parent.appendChild(this.uiElements.host);
  }

  /**
   * Gets current weather and weather forecast for given location
   * @param {Event} ev
   */
  handleLocationSearch(ev) {
    const location = ev.detail.location;
    if (!!location) {
      Promise.all([
        this.components.WeatherApi.getCurrentWeather(location, this.config.units),
        this.components.WeatherApi.getWeatherForecast(location, this.config.units)
      ]).then(results => {
        console.log(results);
      }).catch(error => {
        console.log(error + ' for ' + location);
      });
    }
  }
}
