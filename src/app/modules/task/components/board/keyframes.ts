import { keyframes, style } from '@angular/animations';

const next = [
  style({transform: 'translate3d(0, 0, 0)', opacity: 0, pointerEvents: 'none', offset: 0}),
  style({transform: 'translate3d(-150%, 0, 0)', opacity: 1, pointerEvents: 'auto', offset: 1}),
];

const previous = [
  style({transform: 'translate3d(0, 0, 0)', opacity: 0, pointerEvents: 'none',  offset: 0}),
  style({transform: 'translate3d(150%, 0, 0)', opacity: 1, pointerEvents: 'auto', offset: 1}),
];

export const kf = {
  next: next,
  previous: previous,
};

export const kfTypes = {
  next: 'next',
  previous: 'previous',
};
