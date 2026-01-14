import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('200ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
  ]),
]);
