import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';
  private darkMode$ = new BehaviorSubject<boolean>(false);

  isDarkMode$ = this.darkMode$.asObservable();

  constructor() {
    this.loadTheme();
  }

  toggle(): void {
    this.setDarkMode(!this.darkMode$.value);
  }

  setDarkMode(isDark: boolean): void {
    this.darkMode$.next(isDark);
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    this.applyTheme(isDark);
  }

  private loadTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    this.darkMode$.next(isDark);
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
