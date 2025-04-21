import { Component } from '@angular/core';
import {NavBarComponent} from "../../../shared/components/nav-bar/nav-bar.component";
import {SidebarComponent} from "../../../shared/components/sidebar/sidebar.component";
import {RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-pet-owner-layout',
  standalone: true,
  imports: [
    NavBarComponent,
    SidebarComponent,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './pet-owner-layout.component.html',
  styleUrl: './pet-owner-layout.component.css'
})
export class PetOwnerLayoutComponent {
  isSidebarCollapsed=false;
  options = [
    { label: 'Home', icon: 'pi pi-home', link: '/pet-owner/home' },
    { label: 'Pets', icon: 'pi pi-wifi', link: '/pet-owner/pets' },
    {label: 'Clinics', icon:'pi pi-building', link: '/pet-owner/clinics'},
    { label: 'Appointments', icon: 'pi pi-book', link: '/pet-owner/appointments' },
    { label: 'Notifications', icon: 'pi pi-bell', link: '/pet-owner/notifications' },
    { label: 'Profile', icon: 'pi pi-user', link: '/pet-owner/profile' },
    { label: 'Log out', icon: 'pi pi-sign-out', link: '#', action: 'logout' }
  ];

  onSidebarToggle(isCollapsed:boolean){
    this.isSidebarCollapsed = isCollapsed
  }
}
