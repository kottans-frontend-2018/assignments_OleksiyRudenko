export default class FavCityList {
  constructor(cityList) {
    this.state = Object.keys(cityList).sort();
  }

  /**
   * Listens to 'fav-citylist-updated' event
   * @param ev
   */
  handleUpdatedCityList(ev) {
    this.state = Object.keys(ev.detail.favCityList).sort();
  }
}
