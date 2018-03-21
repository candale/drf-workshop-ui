class Util {

  getPriorityColor(value) {
    switch (+value) {
      case 0:
        return '#9E9E9E';
      case 1:
        return '#4CAF50';
      case 2:
        return '#558B2F';
      case 3:
        return '#FFC107';
      case 4:
        return '#FF5722';
      case 5:
        return '#6A1B9A';
      default:
        return '';
    }
  }

  /** return a date in the ISO 8061 Format */
  parseDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  checkEqual(a, b) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
}

export const util = new Util();
