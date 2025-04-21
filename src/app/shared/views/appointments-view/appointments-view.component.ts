import { Component } from '@angular/core';
import {AppointmentSchemaGet} from "../../../core/Appointment/schema/appointment.interface";
import {AppointmentService} from "../../../core/Appointment/services/appointment.service";
import {AuthService} from "../../../core/auth/services/auth.service";
import {UserType} from "../../../core/auth/enum/UserType.enum";
import {TabMenuModule} from "primeng/tabmenu";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppointmentCardComponent} from "./components/appointment-card/appointment-card.component";

@Component({
  selector: 'app-appointments-view',
  standalone: true,
  imports: [
    TabMenuModule,
    CommonModule,
    FormsModule,
    AppointmentCardComponent
  ],
  templateUrl: './appointments-view.component.html',
  styleUrl: './appointments-view.component.css'
})
export class AppointmentsViewComponent {
  views:{label:string,icon:string}[] = [];
  activeView: {label:string,icon:string} = {label: 'Upcoming', icon: 'pi pi-fw pi-bars'};

  upcomingAppointments: AppointmentSchemaGet[] = [];
  pastAppointments: AppointmentSchemaGet[] = [];

  constructor(
    private appointmentsService:AppointmentService,
    private authService:AuthService
  ) {
    this.views = [
      {label: 'Upcoming', icon: 'pi pi-fw pi-bars'},
      {label: 'Past', icon: 'pi pi-fw pi-clock'},
    ];
  }

  ngOnInit() {
    const user = this.authService.decodeToken();
    const userId = user?.user_id!;
    const role = user?.user_role;

    if(role == UserType.Owner) {
      this.appointmentsService.getPastAppointmentsByOwnerId(userId).subscribe((appointments) => {
        this.pastAppointments = appointments;
      });
      this.appointmentsService.getUpcomingAppointmentsByOwnerId(userId).subscribe((appointments) => {
        this.upcomingAppointments = appointments;
      });
    }
    else if(role == UserType.Vet) {
      this.appointmentsService.getPastAppointmentsByVeterinarianId(userId).subscribe((appointments) => {
        this.pastAppointments = appointments;
      });
      this.appointmentsService.getUpcomingAppointmentsByVeterinarianId(userId).subscribe((appointments) => {
        this.upcomingAppointments = appointments;
      });
    }
  }

}
