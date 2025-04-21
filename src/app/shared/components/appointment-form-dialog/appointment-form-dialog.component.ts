import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ReviewSchemaPost} from "../../../core/review/schema/review.interface";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {formatDateToYYYYMMDD} from "../../helpers/date.formater";
import {PetService} from "../../../core/Pet/services/pet.service";
import {PetSchemaResponse} from "../../../core/Pet/schema/pet.interface";
import {AppointmentSchemaCreate} from "../../../core/Appointment/schema/appointment.interface";
import {AppointmentService} from "../../../core/Appointment/services/appointment.service";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../core/auth/services/auth.service";

@Component({
  selector: 'app-appointment-form-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule
  ],
  templateUrl: './appointment-form-dialog.component.html',
  styleUrl: './appointment-form-dialog.component.css'
})
export class AppointmentFormDialogComponent {
  @Input() visible: boolean = false;
  @Input() onClose!: ()=>void;
  @Input() vetId!: number;

  availableTimes: {name:string, code:number}[] = [];
  pets: {name:string, id:number}[] = [];
  myForm:FormGroup = new FormGroup({});
  user:DecodedToken|null;

  constructor(
      private fb: FormBuilder,
      private vetService:VeterinarianService,
      private petService: PetService,
      private appointmentService: AppointmentService,
      private authService:AuthService
  ) {
    this.myForm = this.fb.group({
      date_day: new FormControl(''),
      description: new FormControl(''),
      start_time: new FormControl(undefined),
      pet: new FormControl(),
    });
    this.user = authService.decodeToken();
  }

  ngOnInit(){
    this.loadPets();
  }

  submitAppointment(){
    let request:AppointmentSchemaCreate = {
      date_day: formatDateToYYYYMMDD(this.myForm.value.date_day),
      description: this.myForm.value.description,
      start_time: this.myForm.value.start_time.name,
      pet_id: this.myForm.value.pet.id,
      veterinarian_id: this.vetId
    }
    console.log("Request", request);
    this.appointmentService.createAppointment(request).subscribe((data:any)=> {
      console.log("Appointment created", data);
      alert("Cita creada con éxito");
      this.onClose();
    });
  }
  loadTimesAvailable(){
      let request = {
        date: formatDateToYYYYMMDD(this.myForm.value.date_day),
      }
      console.log("Request", request);
      this.vetService.getAvailableTimes(this.vetId,request).subscribe((data:any)=>{
        console.log("Available times", data);
        this.availableTimes = data["available_times"].map((time:string, index:number) => {
            return {name: time, code: index};
        });
      });
  }
  loadPets(){
      this.petService.getPetsByOwner(this.user?.user_id!).subscribe((data:PetSchemaResponse[])=>{
          this.pets = data.map((pet:PetSchemaResponse)=>{
              return {
                name: pet.name,
                id: pet.id
              }
          });
      });
  }
}
