import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollY$ = new BehaviorSubject<number>(0);
  scrollPosition$ = this.scrollY$.asObservable();

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(50))
        .subscribe(() => {
          this.scrollY$.next(window.scrollY);
        });
    });
  }

  scrollTo(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
