import { keyframes, style } from '@angular/animations';

const slideOutLeft = [
  style({transform: 'translate3d(0, 0, 0)', offset: 0}),
  style({transform: 'translate3d(-150%, 0, 0)', backgroundColor: 'red', offset: 1}),
];

const slideOutRight = [
  style({transform: 'translate3d(0, 0, 0)', offset: 0}),
  style({transform: 'translate3d(150%, 0, 0)', backgroundColor: 'green', offset: 1}),
];

export const kf = {
  slideOutLeft: slideOutLeft,
  slideOutRight: slideOutRight,
};

export const kfStrings = [
  'slideOutLeft',
  'slideOutRight',
];
