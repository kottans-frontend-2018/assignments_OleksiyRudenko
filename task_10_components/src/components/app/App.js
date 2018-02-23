import LocationSearch from '../location-search/LocationSearch.js';
import WeatherApi from '../open-weather-map-api/OpenWeatherMapAPI.js';
import CurrentWeather from '../current-weather/CurrentWeather.js';
import WeatherForecast from '../weather-forecast/WeatherForecast.js';
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
      weatherContainer: html.createElement({
        tag: 'div',
        id: 'app-weather-container',
      }),
    };
    this.components = {
      LocationSearch: new LocationSearch(),
      WeatherApi: new WeatherApi('0f034f0e9216aaa8ed94c3d87af01e18'),
    };
    this.config = {
      currentUnits: 'metric',
    };
    this.state = {
      location: null,
      favourites: this.getFavouritesFromLocalStorage(),
    };
    this.render();
  }

  /**
   * Renders application and its components
   */
  render() {
    this.uiElements.host.appendChild(this.components.LocationSearch.uiElements.host);
    this.uiElements.host.appendChild(this.uiElements.weatherContainer);
    this.uiElements.host.addEventListener('location-search', this.handleLocationSearch.bind(this));
    this.uiElements.host.addEventListener('fav-city', this.handleSetFavCity.bind(this));
    this.uiElements.parent.appendChild(this.uiElements.host);
  }

  /**
   * Gets current weather and weather forecast for given location
   * @param {Event} ev
   */
  handleLocationSearch(ev) {
    const location = ev.detail.location;
    if (!!location) {
      this.state.location = location;
      Promise.all([
        this.components.WeatherApi.getCurrentWeather(location, this.config.currentUnits),
        this.components.WeatherApi.getWeatherForecast(location, this.config.currentUnits)
      ]).then(results => {
        console.log(results);
        const weatherData = [
          this.extractCurrentWeather(results[0]),
          this.extractWeatherForecast(results[1])
        ];
        console.log(weatherData);
        this.components.CurrentWeather = new CurrentWeather(weatherData[0]);
        this.components.WeatherForecast = new WeatherForecast(weatherData[1]);

        this.uiElements.weatherContainer.innerHTML = '';
        this.uiElements.weatherContainer.appendChild(this.components.CurrentWeather.uiElements.host);
        this.uiElements.weatherContainer.appendChild(this.components.WeatherForecast.uiElements.host);
      }).catch(error => {
        console.log(error + ' for ' + location);
      });
    }
  }

  /**
   * Handles signal from FavCityButton
   * @param ev
   */
  handleSetFavCity(ev) {
    if (!(/^[\-\d\s,.]+$/.test(this.state.location))) {
      if (ev.detail.isFavourite) {
        // update browser storage & local state
        this.state.favourites[this.state.location] = this.state.location;
      } else {
        delete this.state.favourites[this.state.location];
      }
      this.setFavouritesIntoLocalStorage();
      this.uiElements.host.dispatchEvent(new CustomEvent('fav-citylist-updated', {
        detail: { favCityList: this.state.favourites },
        bubbles: false,
        cancelable: false,
      }));
    }
  }

  /**
   * Extracts current weather from raw data
   * @param {object} d
   * @returns {{coord: *, city, country: *|string, condition: string, description: string, mediaCode: string, humidity: number, pressure: number, temp: number, wind: {}}}
   */
  extractCurrentWeather(d) {
    const result = {
      coord: d.coord, // lat, lon
      city: d.name,
      country: d.sys.country,
      condition: d.weather[0].main,
      description: d.weather[0].description,
      skies: this.getSkies(d.weather[0].icon),
      humidity: d.main.humidity,
      pressure: Math.round(d.main.pressure / 1013.25 * 100) / 100,
      temp: Math.round(d.main.temp),
      wind: d.wind, // deg, speed
    };
    result.currentUnits = this.config.currentUnits;
    this.state.location = d.name + ',' + d.sys.country;
    result.isFavourite = !!this.state.favourites[this.state.location];
    return result;
  }

  /**
   * Extracts weather forecast from raw data
   * @param {object} d
   * @returns {{date: string, hours: string, condition: string, mediaCode: string, temp: number}[]}
   */
  extractWeatherForecast(d) {
    let weatherList = d.list.filter(item => {
      const time = item.dt_txt.substring(11,13);
      // console.log('Time: ' + time);
      return (time === '03' || time === '09' || time === '15' || time === '21');
    });
    weatherList.sort((a,b) => a.dt - b.dt);
    const result = weatherList.map(item => ({
      date: item.dt_txt.substring(8,10) + '/' + item.dt_txt.substring(5,7),
      hours: item.dt_txt.substring(11,13),
      condition: item.weather[0].main,
      skies: this.getSkies(item.weather[0].icon),
      temp: Math.round(item.main.temp),
    }));
    return result;
  }

  /**
   * Decomposes iconId code into skies description
   * @param {string} iconId
   * returns {Object} { tod: day|night, conditions: ... }
   */
  getSkies(iconId) {
    return {
      tod: iconId.substr(2) === 'd' ? 'day' : 'night',
      conditions: this.verbalizeConditionsCode(iconId.substr(0,2)),
    };
  }

  /**
   * Verbalizes 2-digit conditions code
   * @param {string} conditionsCode
   * @returns {string}
   * http://erikflowers.github.io/weather-icons/
   * http://www.alessioatzeni.com/meteocons/
   */
  verbalizeConditionsCode(conditionsCode) {
    switch (conditionsCode) {
      case '01': return 'clearSky';
      case '02': return 'fewClouds';
      case '03': return 'scatteredClouds';
      case '04': return 'brokenClouds';
      case '09': return 'showerRain';
      case '10': return 'rain';
      case '11': return 'thunderStorm';
      case '13': return 'snow';
      case '50': return 'mist';
      default: return 'unknown';
    }
  }

  /**
   * Retrieves favcities list from localStorage
   */
  getFavouritesFromLocalStorage() {
    return this.getFromLocalStorage('favcities') || {};
  }

  /**
   * Set favcities into localStorage
   */
  setFavouritesIntoLocalStorage() {
    console.log('Updating favcitylist');
    console.log(this.state.favourites);
    this.setIntoLocalStorage('favcities', this.state.favourites);
  }

  /**
   * Retrieves and unserializes data from localStorage
   * @param {string} key
   */
  getFromLocalStorage(key) {
    const data = window.localStorage.getItem(key);
    if (!!data) {
      return JSON.parse(data);
    }
    return data;
  }

  /**
   * Stores data at localStorage
   * @param {string} key
   * @param {*} value
   */
  setIntoLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
