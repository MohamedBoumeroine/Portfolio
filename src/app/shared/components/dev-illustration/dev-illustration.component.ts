import { Component, Input } from '@angular/core';

/**
 * Animated developer workspace SVG illustration.
 *
 * HOW TO SWAP FOR LOTTIE IN THE FUTURE:
 * 1. Install: npm install lottie-web ngx-lottie
 * 2. Replace the SVG template with: <ng-lottie [options]="lottieOptions"></ng-lottie>
 * 3. Set lottieOptions = { path: 'assets/animations/developer.json', loop: true, autoplay: true }
 * 4. Import LottieModule in SharedModule
 *
 * HOW TO SWAP THE SVG:
 * - Replace the contents of dev-illustration.component.html with any new SVG.
 * - Keep the same CSS class names for animations or add your own.
 */
@Component({
  selector: 'app-dev-illustration',
  templateUrl: './dev-illustration.component.html',
  styleUrls: ['./dev-illustration.component.scss'],
})
export class DevIllustrationComponent {
  /** Scale factor for responsiveness (default 1) */
  @Input() scale = 1;
  /** ARIA label for accessibility */
  @Input() ariaLabel = 'Animated illustration of a developer workspace with laptop, code, and tech tools';
}
