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
      container: html.createElement({
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
    this.uiElements.parent.appendChild(this.uiElements.container);
    this.components.LocationSearch.uiElements.form.addEventListener('submit', this.handleFormSubmission.bind(this));
    this.components.LocationSearch.uiElements.searchButton.addEventListener('click', this.handleSearchButton.bind(this));
    this.uiElements.container.appendChild(this.components.LocationSearch.uiElements.form);
  }

  /**
   * Handles form submission
   * @param ev
   */
  handleFormSubmission(ev) {
    ev.preventDefault();
    this.getWeather(ev.target.elements['location-search-text'].value);
  }

  /**
   * Handles search button click
   * @param {Event} ev
   */
  handleSearchButton(ev) {
    ev.preventDefault();
    this.getWeather(this.components.LocationSearch.uiElements.textInput.value);
  }

  /**
   * Gets current weather and weather forecast for given location
   * @param {string} location
   */
  getWeather(location) {
    location = location.trim();
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
