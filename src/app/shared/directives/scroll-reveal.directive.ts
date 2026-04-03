import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

@Directive({ selector: '[appScrollReveal]' })
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealDirection: RevealDirection = 'up';
  @Input() revealDistance = '30px';
  @Input() revealDuration = 0.6;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;

    // Set initial hidden state based on direction
    el.style.opacity = '0';
    el.style.transition = `opacity ${this.revealDuration}s ease-out, transform ${this.revealDuration}s ease-out`;
    el.style.willChange = 'opacity, transform';

    switch (this.revealDirection) {
      case 'up':
        el.style.transform = `translateY(${this.revealDistance})`;
        break;
      case 'down':
        el.style.transform = `translateY(-${this.revealDistance})`;
        break;
      case 'left':
        el.style.transform = `translateX(${this.revealDistance})`;
        break;
      case 'right':
        el.style.transform = `translateX(-${this.revealDistance})`;
        break;
      case 'scale':
        el.style.transform = 'scale(0.9)';
        break;
      case 'none':
        break;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0) translateX(0) scale(1)';
            }, this.revealDelay);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
