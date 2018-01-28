class DateX extends Date {
  constructor(a, b, c, d, e, f, g) {
    switch (arguments.length) {
      case 0:
        super();
        break;
      case 1:
        super(a);
        break;
      case 2:
        super(a, b);
        break;
      case 3:
        super(a, b, c);
        break;
      case 4:
        super(a, b, c, d);
        break;
      case 5:
        super(a, b, c, d, e);
        break;
      case 6:
        super(a, b, c, d, e, f);
        break;
      default:
        super(a, b, c, d, e, f, g);
    }
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
    return `${this.getHours()}:${this.getMinutes()}}`;
  }

  getYMDHM() {
    return this.getYMD() + ' ' + this.getHM();
  }
}