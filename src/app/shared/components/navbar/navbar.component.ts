import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ScrollService } from '../../../core/services/scroll.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDark$!: Observable<boolean>;
  isScrolled = false;
  mobileMenuOpen = false;

  navLinks = [
    { label: 'Home', route: '/', fragment: 'home' },
    { label: 'About', route: '/about', fragment: 'about' },
    { label: 'Projects', route: '/projects', fragment: 'projects' },
    { label: 'Experience', route: '/experience', fragment: 'experience' },
    { label: 'Contact', route: '/contact', fragment: 'contact' },
  ];

  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.isDark$ = this.themeService.isDarkMode$;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
  }
}
