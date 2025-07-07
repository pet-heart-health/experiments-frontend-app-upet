import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {ClinicCardComponent} from "../../../shared/components/clinic-card/clinic-card.component";
import {CustomMapComponent} from "../../../shared/components/custom-map/custom-map.component";
import {DialogModule} from "primeng/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {SearchBarComponent} from "../../../shared/components/search-bar/search-bar.component";
import {TranslatePipe} from "@ngx-translate/core";
import {VeterinaryClinicSchemaGet} from "../../../core/VeterinaryClinic/schema/veterinary-clinic.interface";
import {MapMarkerCustom} from "../../../shared/components/custom-map/interfaces/MapMarkerCustom";
import {VeterinaryClinicService} from "../../../core/VeterinaryClinic/services/veterinary-clinic.service";
import {VetClinicResponse} from "../../../core/networking/response/VetClinicResponse";
import {FavoriteClinicsService} from "../../../core/favoriteClinics/favorite-clinics.service";
import {AuthService} from "../../../core/auth/services/auth.service";

@Component({
  selector: 'app-clinics-favorites',
  standalone: true,
  imports: [
    Button,
    ClinicCardComponent,
    CustomMapComponent,
    DialogModule,
    NgForOf,
    SearchBarComponent,
    TranslatePipe,
    NgIf
  ],
  templateUrl: './clinics-favorites.component.html',
  styleUrl: './clinics-favorites.component.css'
})
export class ClinicsFavoritesComponent {
  clinics: VeterinaryClinicSchemaGet[] = [];
  clinicsAux: VeterinaryClinicSchemaGet[] = [];
  visibleMapDialog = false;
  markers: MapMarkerCustom[] = [];
  constructor(private clinicsApiService: VeterinaryClinicService,
              private favoriteClinics:FavoriteClinicsService,
              private authService:AuthService,
              ) {

  }

  ngOnInit() {
    let userId = this.authService.decodeToken()?.user_id;
    this.fetchFavoriteClinics(userId!);

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
  fetchFavoriteClinics(userId:number) {
    this.favoriteClinics.getFavoriteClinics(userId).subscribe({
        next: (clinics: VeterinaryClinicSchemaGet[]) => {
          this.clinics = clinics;
          this.clinicsAux = clinics;
          this.markers = clinics.map((clinic: VeterinaryClinicSchemaGet): MapMarkerCustom =>
            this.parseClinicToMarker(clinic));
        },
        error: (error) => {
          console.error('Error fetching favorite clinics:', error);
        }
      }
    )
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
