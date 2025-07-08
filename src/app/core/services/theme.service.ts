import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme ? JSON.parse(savedTheme) : prefersDark;
    this.setDarkMode(isDark);
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkModeSubject.value);
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    localStorage.setItem('darkMode', JSON.stringify(isDark));

    const themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = isDark
        ? 'assets/themes/lara-dark-blue/theme.css'
        : 'assets/themes/lara-light-blue/theme.css';
    }

    setTimeout(() => {
      if (isDark) {
        this.document.body.classList.add('dark-theme');
      } else {
        this.document.body.classList.remove('dark-theme');
      }
    }, 50);
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
