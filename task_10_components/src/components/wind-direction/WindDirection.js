export default class WindDirection {
  constructor(degrees) {
    this.state = degrees;
  }

  render() {
    return (this.state == null) ? '' : '<i class="wi ' + this.getWindDirectionIcon(this.state) + '"></i>';
  }

  getWindDirectionIcon(degrees) {
    let iconComponents = ['wi', 'direction'];
    let vertical = '', horizontal = '';
    const segment = Math.floor((degrees + 22.5) / 45);
    switch (segment) {
      case 0: case 1: case 7: case 8: vertical = 'up'; break;
      case 3: case 4: case 5: vertical = 'down'; break;
    }
    switch (segment) {
      case 1: case 2: case 3: horizontal = 'right'; break;
      case 5: case 6: case 7: horizontal = 'left'; break;
    }
    if (!!vertical) iconComponents.push(vertical);
    if (!!horizontal) iconComponents.push(horizontal);
    return iconComponents.join('-');
  }

}
