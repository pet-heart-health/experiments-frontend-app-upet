import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { PetCardComponent } from "../../../shared/components/pet-card/pet-card.component";
import { BannerOwnerComponent } from "./components/banner-owner/banner-owner.component";
import { ListOwnerPetsComponent } from "./components/list-owner-pets/list-owner-pets.component";
import { ListScpecialistsNearbyComponent } from "./components/list-scpecialists-nearby/list-scpecialists-nearby.component";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../core/auth/services/auth.service";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ReminderService} from "../../../core/Reminder/reminder.service";
import {ReminderSchemaPost} from "../../../core/Reminder/ReminderSchemaPost";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-home-pet-owner',
  standalone: true,
  imports: [
    PetCardComponent,
    BannerOwnerComponent,
    ListOwnerPetsComponent,
    ListScpecialistsNearbyComponent,
    NgClass,
    Button,
    DialogModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './home-pet-owner.component.html',
  styleUrls: ['./home-pet-owner.component.css'] // Cambiado de 'styleUrl' a 'styleUrls'
})
export class HomePetOwnerComponent {
  dialogVisible: boolean = false;
  reminderForm:FormGroup ;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private reminderService: ReminderService
  ) {
      this.reminderForm = new FormGroup({
        title: new FormControl('',[Validators.required]),
        description: new FormControl('', [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        time: new FormControl(new Date(), [Validators.required]),
      });
  }

  saveReminder(){
      let userId = this.authService.decodeToken()?.user_id!;
      let data:ReminderSchemaPost= {
        title: this.reminderForm.get('title')?.value,
        description: this.reminderForm.get('description')?.value,
        date_time: new Date(
          this.reminderForm.get('date')?.value + 'T' + this.reminderForm.get('time')?.value
        ),
        user_id: userId
      };
      this.isLoading = true;
      this.reminderService.createReminder(data).subscribe({
        next: (response) => {
          alert('Recordatorio creado exitosamente:');
          this.dialogVisible = false;
          this.reminderForm.reset();
        },
        error: (error) => {
          alert('Error al crear el recordatorio:');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });

  }
  showDialog() {
    this.dialogVisible = true;
  }
  hideDialog() {
    this.dialogVisible = false;
    this.reminderForm.reset();
  }

}
