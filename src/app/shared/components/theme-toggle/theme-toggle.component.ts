import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button
      (click)="toggleTheme()"
      [icon]="themeService.isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
      [text]="true"
      [rounded]="true"
      [attr.aria-label]="themeService.isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'">
    </p-button>
  `
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
}
