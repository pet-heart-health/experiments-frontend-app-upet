import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Input() options: any[] = [];
  isCollapsed = false;

  constructor(private router: Router) {
  }

  logout() {
    localStorage.clear();
    alert('Se ha cerrado la sesión correctamente.');
    this.router.navigate(['/auth/login']).then(r => r);
  }

  handleOptionClick(option: any) {
    if (option.action === 'logout') {
      this.logout();
    } else {
      this.collapseSidebar();
    }
  }

  collapseSidebar(){
    this.isCollapsed = true;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  expandSidebar(){
    this.isCollapsed = false;
    this.sidebarToggle.emit(this.isCollapsed);
  }



}
