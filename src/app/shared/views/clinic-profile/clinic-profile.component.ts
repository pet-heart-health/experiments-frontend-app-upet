import {Component} from '@angular/core';
import {VeterinaryClinicService} from "../../../core/VeterinaryClinic/services/veterinary-clinic.service";
import {VeterinaryClinicSchemaGet} from "../../../core/VeterinaryClinic/schema/veterinary-clinic.interface";
import {ActivatedRoute} from "@angular/router";
import {JsonPipe, NgForOf} from "@angular/common";
import {VetCardComponent} from "../../components/vet-card/vet-card.component";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {VeterinarianSchemaResponse} from "../../../core/Veterinarian/schema/veterinarian.interface";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Button} from "primeng/button";
import {FavoriteClinicsService} from "../../../core/favoriteClinics/favorite-clinics.service";
import {AuthService} from "../../../core/auth/services/auth.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-clinic-profile',
  standalone: true,
  imports: [
    JsonPipe,
    VetCardComponent,
    NgForOf,
    TranslatePipe,
    Button,
    TooltipModule
  ],
  templateUrl: './clinic-profile.component.html',
  styleUrl: './clinic-profile.component.css'
})
export class ClinicProfileComponent {
  clinic: VeterinaryClinicSchemaGet = {} as VeterinaryClinicSchemaGet;
  vets: VeterinarianSchemaResponse[] = [];
  tooltipText: string = '';
  isFavoriteClinic: boolean = false;
  isLoading: boolean = false;

  constructor(
    private veterinayClinicService: VeterinaryClinicService,
    private veterinarianService: VeterinarianService,
    private favoriteClinicsService: FavoriteClinicsService,
    private authService: AuthService,
    private translateService: TranslateService,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    let clinicId = this.activateRoute.snapshot.params['id'];

    this.veterinayClinicService.getVeterinaryClinicById(clinicId).subscribe(clinic => {
      this.clinic = clinic;
      this.updateFavorite();

    });
    this.veterinarianService.getVetsByClinicId(clinicId).subscribe(vets => {
      this.vets = vets;
    });

    this.translateService.onLangChange.subscribe(lang => {
      this.updateTooltip();
    });

  }


  toggleFavorite() {
    const userId = this.authService.decodeToken()?.user_id;
    if (userId) {
      this.isLoading = true;
      this.favoriteClinicsService.toggle(userId, this.clinic.id).subscribe(
        {
          next:()=>{
            this.updateFavorite();
          },
          complete:()=> {
            this.isLoading = false;
          }
        }
      );
    }
  }

  updateFavorite() {
    const userId = this.authService.decodeToken()?.user_id;
    if (userId) {
      this.favoriteClinicsService.isClinicFavorite(userId, this.clinic.id).subscribe({
        next: (isFavorite) => {
          this.isFavoriteClinic = isFavorite;
          this.updateTooltip();
        },
        error: (error) => {
          console.error('Error checking favorite clinic:', error);
        }
      });
    }
    return false;
  }

  updateTooltip() {
    this.tooltipText = this.isFavoriteClinic
      ? this.translateService.instant('clinic_profile.no_favorite_tooltip')
      : this.translateService.instant('clinic_profile.favorite_tooltip');
  }
}
