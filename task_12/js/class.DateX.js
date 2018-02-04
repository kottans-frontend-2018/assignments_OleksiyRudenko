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
    return (this.date.getSeconds() + '').padStart(2, '0');
  }

  /**
   * Returns zero-padded minutes.
   * @returns {string}
   */
  getMinutes() {
    return (this.date.getMinutes() + '').padStart(2, '0');
  }

  /**
   * Returns zero-padded hours.
   * @returns {string}
   */
  getHours() {
    return (this.date.getHours() + '').padStart(2, '0');
  }

  /**
   * Returns zero-padded day of month.
   * @returns {string}
   */
  getDate() {
    return (this.date.getDate() + '').padStart(2, '0');
  }

  /**
   * Returns zero-padded month.
   * @returns {string}
   */
  getMonth() {
    return ((this.date.getMonth() + 1) + '').padStart(2, '0');
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
