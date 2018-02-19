import * as Obj from '../../utils/object.js';

export default class OpenWeatherMapAPI {
  /**
   * Creates service to serve API requests from openweathermap.org
   * @param {string} apiKey
   */
  constructor(apiKey) {
    this.config = {
      apiKey: apiKey,
      apiUrl: 'https://api.openweathermap.org/data/2.5/',
    };
  }

  /**
   * Gets current weather
   * @param {string} location =cityname|lon,lat
   * @param {string} units =metric|imperial
   * @returns {Promise}
   */
  getCurrentWeather(location, units) {
    return this.getWeather('weather', location, units);
  }

  /**
   * Gets weather forecast
   * @param {string} location =cityname|lon,lat
   * @param {string} units =metric|imperial
   * @returns {Promise}
   */
  getWeatherForecast(location, units) {
    return this.getWeather('forecast', location, units);
  }

  /* private */

  /**
   * Gets weather via API
   * @param {string} path =weather|forecast
   * @param {string} location =cityName[,countryCode]|geoCoords
   * @param {string} units =metric|imperial
   */
  getWeather(path, location, units) {
    const splitLocation = location.split(/[\s,]/);
    const params = /^[\-\d\s,.]+$/.test(location)
      ? {
        lon: splitLocation[0],
        lat: splitLocation[splitLocation.length-1],
      }
      : {
        q: location,
        type: 'like',
      };
    params.units = units;

    return fetch(this.config.apiUrl + path + '?APPID=' + this.config.apiKey + '&' +
      Obj.map(params, (key, value) => key + '=' + value).join('&'),
      {method: 'get'}).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response.statusText + ' for ' + path + '/' + location;
    });
  }
}
