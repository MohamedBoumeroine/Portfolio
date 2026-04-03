import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') targetValue = '';
  @Input() countDuration = 2000;
  @Input() countSuffix = '';
  private observer!: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animate();
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animate(): void {
    const el = this.el.nativeElement as HTMLElement;
    const numericMatch = this.targetValue.match(/^(\d+)/);

    if (!numericMatch) {
      // Non-numeric value (e.g. "UIR") — just set it
      el.textContent = this.targetValue + this.countSuffix;
      return;
    }

    const target = parseInt(numericMatch[1], 10);
    const suffix = this.targetValue.replace(/^\d+/, '') + this.countSuffix;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.countDuration, 1);
      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }
}
