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

}

export const util = new Util();
