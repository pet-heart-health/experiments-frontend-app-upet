import { Component } from '@angular/core';
import {VetClinicResponse} from "../../../core/networking/response/VetClinicResponse";
import {MapMarkerCustom} from "../../../shared/components/custom-map/interfaces/MapMarkerCustom";
import {ClinicCardComponent} from "../../../shared/components/clinic-card/clinic-card.component";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CustomMapComponent} from "../../../shared/components/custom-map/custom-map.component";
import {NgForOf} from "@angular/common";
import {VeterinaryClinicService} from "../../../core/VeterinaryClinic/services/veterinary-clinic.service";
import {VeterinaryClinicSchemaGet} from "../../../core/VeterinaryClinic/schema/veterinary-clinic.interface";
import {SearchBarComponent} from "../../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-clinics-pet-owner',
  standalone: true,
  imports: [
    ClinicCardComponent,
    Button,
    DialogModule,
    CustomMapComponent,
    NgForOf,
    SearchBarComponent
  ],
  templateUrl: './clinics-pet-owner.component.html',
  styleUrl: './clinics-pet-owner.component.css'
})
export class ClinicsPetOwnerComponent {
  clinics: VeterinaryClinicSchemaGet[] = [];
  clinicsAux: VeterinaryClinicSchemaGet[] = [];
  visibleMapDialog = false;
  markers: MapMarkerCustom[] = [];

  constructor(private clinicsApiService: VeterinaryClinicService) {
  }

  ngOnInit() {
    this.clinicsApiService.getVeterinaryClinics().subscribe((clinics: VeterinaryClinicSchemaGet[]) => {
      this.clinics = clinics;
      this.clinicsAux = clinics;
      this.markers = clinics.map((clinic: VeterinaryClinicSchemaGet): MapMarkerCustom =>
          this.parseClinicToMarker(clinic));
      console.log("markers", this.markers);
    });
  }

  parseClinicToMarker(clinic: VetClinicResponse): MapMarkerCustom {
    let coords = clinic.location.split(',');
    return {
      name: clinic.name,
      coords: {
        lat: parseFloat(coords[0]),
        lng: parseFloat(coords[1])
      },
      iconUrl: clinic.image_url
    }
  }

  closeMapDialog() {
    this.visibleMapDialog = false;
  }

  openMapDialog() {
    this.visibleMapDialog = true;
  }

  filterClinics = (keY: string) => {
    if (keY === '') {
      this.clinics = [...this.clinicsAux];
    }
    this.clinics = this.clinicsAux.filter((clinic) => {
      return clinic.name.includes(keY);
    });
  }
}
