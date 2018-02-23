export default class WeatherIcon {
  /**
   * @constructor
   * @param {object} state {tod:day|night, conditions:string}
   */
  constructor(state) {
    this.state = state;
    this.config = {
      day: {
        brokenClouds: 'wi-day-cloudy',
        clearSky: 'wi-day-sunny',
        fewClouds: 'wi-day-cloudy',
        mist: 'wi-day-fog',
        rain: 'wi-day-rain',
        scatteredClouds: 'wi-day-cloudy-high',
        showerRain: 'wi-day-showers',
        snow: 'wi-day-snow-wind',
        thunderStorm: 'wi-day-thunderstorm',
        alien: 'wi-alien',
      },
      night: {
        brokenClouds: 'wi-night-cloudy',
        clearSky: 'wi-night-clear',
        fewClouds: 'wi-night-cloudy',
        mist: 'wi-night-fog',
        rain: 'wi-night-alt-rain',
        scatteredClouds: 'wi-night-alt-cloudy-high',
        showerRain: 'wi-night-alt-showers',
        snow: 'wi-night-alt-snow-wind',
        thunderStorm: 'wi-night-alt-thunderstorm',
        alien: 'wi-alien',
      },
    };
  }

  render() {
    return '<i class="wi ' + this.getWeatherConditionsIcon(this.state) + '"></i>';
  }

  /**
   * Picks weather icon based on time of the day and conditions
   * @param {object} skies {tod:day|night, conditions: clearSky|rain|snow|...}
   * @returns {string}
   */
  getWeatherConditionsIcon(skies) {
    if (!skies.tod)
      skies.tod = 'day';
    if (skies.conditions === 'unknown' || Math.floor(Math.random() * 41) > 39) {
      skies.conditions = 'alien';
    }
    return this.config[skies.tod][skies.conditions];
  }
}
