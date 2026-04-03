import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { CountUpDirective } from './directives/count-up.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DevIllustrationComponent } from './components/dev-illustration/dev-illustration.component';

@NgModule({
  declarations: [
    ScrollRevealDirective,
    CountUpDirective,
    NavbarComponent,
    FooterComponent,
    DevIllustrationComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    ScrollRevealDirective,
    CountUpDirective,
    NavbarComponent,
    FooterComponent,
    DevIllustrationComponent,
  ],
})
export class SharedModule {}
