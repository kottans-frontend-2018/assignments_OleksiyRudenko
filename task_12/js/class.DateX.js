/**
 * class DateX
 */
class DateX {
  constructor() {
    this.date = new Date(...arguments);
  }

  /**
   * Returns zero-padded seconds.
   * @returns {string}
   */
  getSeconds() {
    const seconds = this.date.getSeconds();
    return (seconds < 10) ? '0' + seconds : '' + seconds;
  }

  /**
   * Returns zero-padded minutes.
   * @returns {string}
   */
  getMinutes() {
    const minutes = this.date.getMinutes();
    return (minutes < 10) ? '0' + minutes : '' + minutes;
  }

  /**
   * Returns zero-padded hours.
   * @returns {string}
   */
  getHours() {
    const hours = this.date.getHours();
    return (hours < 10) ? '0' + hours : '' + hours;
  }

  /**
   * Returns zero-padded day of month.
   * @returns {string}
   */
  getDate() {
    const day = this.date.getDate();
    return (day < 10) ? '0' + day : '' + day;
  }

  /**
   * Returns zero-padded month.
   * @returns {string}
   */
  getMonth() {
    const months = this.date.getMonth() + 1;
    return (months < 10) ? '0' + months : '' + months;
  }

  /**
   * Returns date as YYYY-MM-DD
   * @returns {string}
   */
  getYMD() {
    return `${this.date.getFullYear()}-${this.getMonth()}-${this.getDate()}`;
  }

  /**
   * Returns time as HH:mm (24 hrs)
   * @returns {string}
   */
  getHM() {
    return `${this.getHours()}:${this.getMinutes()}`;
  }

  /**
   * Returns datetime as YYYY-MM-DD HH:mm
   * @returns {string}
   */
  getYMDHM() {
    return this.getYMD() + ' ' + this.getHM();
  }

  /**
   * Passthrough for date.toLocaleTimeString()
   * @returns {string}
   */
  toLocaleTimeString() {
    return this.date.toLocaleTimeString(...arguments);
  }

  /**
   * Passthrough for date.getTime()
   * @returns {number}
   */
  getTime() {
    return this.date.getTime(...arguments);
  }

  /**
   * Passthrough for date.setTime()
   * @returns {number}
   */
  setTime() {
    return this.date.setTime(...arguments);
  }
}
