import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {VetClinicResponse} from "../../../core/networking/response/VetClinicResponse";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-clinic-card',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './clinic-card.component.html',
  styleUrl: './clinic-card.component.css'
})
export class ClinicCardComponent {
  @Input() clinic!: VetClinicResponse;

  constructor(
    private router:Router
  ) { }

  toClinicProfile(){
    this.router.navigate([`/pet-owner/clinics/${this.clinic.id}`]).then(r=>r);
  }
}
