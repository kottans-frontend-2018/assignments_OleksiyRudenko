class DateX extends Date {
  constructor() {
    super(...arguments);
  }

  getSeconds() {
    const seconds = super.getSeconds();
    return (seconds < 10) ? '0' + seconds : seconds;
  }

  getMinutes() {
    const minutes = super.getMinutes();
    return (minutes < 10) ? '0' + minutes : minutes;
  }

  getHours() {
    const hours = super.getHours();
    return (hours < 10) ? '0' + hours : hours;
  }

  getDate() {
    const day = super.getDate();
    return (day < 10) ? '0' + day : day;
  }

  getMonth() {
    const months = super.getMonth() + 1;
    return (months < 10) ? '0' + months : months;
  }

  getYMD() {
    return `${this.getFullYear()}-${this.getMonth()}-${this.getDate()}`;
  }

  getHM() {
    return `${this.getHours()}:${this.getMinutes()}`;
  }

  getYMDHM() {
    return this.getYMD() + ' ' + this.getHM();
  }
}