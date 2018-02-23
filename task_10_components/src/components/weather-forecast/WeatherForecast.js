import './style.css';
import * as html from "../../utils/html.js";
import WeatherIcon from '../weather-icon/WeatherIcon.js';

export default class WeatherForecast {
  /**
   * @constructor
   * @param {object} weatherForecast
   */
  constructor(weatherForecast) {
    this.state = weatherForecast;
    this.uiElements = {
      host: html.createElement({
        tag: 'div',
        id: 'weather-forecast-container',
      })
    };
    this.render();
  }

  /**
   * Renders component
   */
  render() {
    const forecastItems = this.state.map(item => {
      const weatherIcon = new WeatherIcon(item.skies);
      return `<div class="weather-forecast-item 
        ${this.getShadeOfTheTime(item.hours)}">
        <div class="weather-forecast-icon">${weatherIcon.render()}</div>
        <div class="weather-forecast-descr">${item.condition}</div>
        <div class="weather-forecast-temp">${item.temp}&deg;</div>
        <div class="weather-forecast-time">${item.hours}:00</div>
        <div class="weather-forecast-date">${item.date}</div>
        </div>`;
    });
    this.uiElements.host.innerHTML = forecastItems.join('');
  }

  /**
   * Return shade of time of the day based on hours
   * @param hours
   * @returns {string}
   */
  getShadeOfTheTime(hours) {
    return (hours < '01') ? 'weather-forecast-dark' :
      (hours < '04') ? 'weather-forecast-darkest' :
        (hours < '07') ? 'weather-forecast-dark' :
          (hours < '10') ? 'weather-forecast-neutral' :
            (hours < '13') ? 'weather-forecast-light' :
              (hours < '16') ? 'weather-forecast-lightest' :
                (hours < '19') ? 'weather-forecast-light' :
                  (hours < '22') ? 'weather-forecast-neutral' :
                    'weather-forecast-dark';
  }
}
