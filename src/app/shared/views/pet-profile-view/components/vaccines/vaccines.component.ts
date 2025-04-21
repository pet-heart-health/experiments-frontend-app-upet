import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DividerModule} from "primeng/divider";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {formatDateToYYYYMMDD} from "../../../../helpers/date.formater";
import { VaccineSchemaRequest, VaccineSchemaResponse } from '../../../../../core/MedicalHistory/schema/vaccine.interface';
import { MedicalHistoryBaseService } from '../../../../../core/MedicalHistory/services/shared/medical-history-base.service';
import { VaccineService } from '../../../../../core/MedicalHistory/services/Vaccines/vaccine.service';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [
    Button,
    CalendarModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    NgForOf,
    PaginatorModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.css'
})
export class VaccinesComponent {
  vaccines:VaccineSchemaResponse[] = [];
  @Input() medicalHistoryId: number | undefined;
  myForm:FormGroup = new FormGroup({});
  constructor(
    private fb:FormBuilder,
    private vaccineService:VaccineService
  ) {
  }
  ngOnInit() {

    this.vaccineService.getAllVaccines(this.medicalHistoryId!)
      .subscribe((results: VaccineSchemaResponse[]) => {
        this.vaccines = results.reverse();
        console.log({vaccines:results})
      });

    this.myForm = this.fb.group({
      name: [''],
      vaccineDate: [new Date()],
      vaccineType: [''],
      dose: [''],
      location: [''],
    });
  }

  submit(){
    let request:VaccineSchemaRequest = {
      name : this.myForm.value.name,
      vaccineDate : formatDateToYYYYMMDD(this.myForm.value.vaccineDate),
      vaccineType : this.myForm.value.vaccineType,
      dose : this.myForm.value.dose,
      location : this.myForm.value.location,
      medicalHistoryId : this.medicalHistoryId!
    }
    this.vaccineService.addVaccine(
      request,
      this.medicalHistoryId!
    )
      .subscribe(() => {
          alert('Vaccine created successfully');
          window.location.reload();
      });
  }

}
