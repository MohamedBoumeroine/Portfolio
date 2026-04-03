import { Component, HostListener } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        // Hide the entering page and position leaving page
        query(':enter', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'translateY(24px)',
          }),
        ], { optional: true }),
        // Animate leaving page out and entering page in
        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateY(-16px)',
            })),
          ], { optional: true }),
          query(':enter', [
            animate('450ms 150ms cubic-bezier(0.35, 0, 0.25, 1)', style({
              opacity: 1,
              transform: 'translateY(0)',
            })),
          ], { optional: true }),
        ]),
        query(':enter', animateChild(), { optional: true }),
      ]),
    ]),
  ],
})
export class AppComponent {
  showScrollTop = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
