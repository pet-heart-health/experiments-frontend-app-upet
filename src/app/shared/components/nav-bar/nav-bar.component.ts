import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../core/auth/services/auth.service";
import {PetOwnerSchemaGet} from "../../../core/PetOwner/schema/petowner.interface";
import {PetOwnerService} from "../../../core/PetOwner/services/pet-owner.service";
import {UserType} from "../../../core/auth/enum/UserType.enum";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {VeterinarianSchemaResponse} from "../../../core/Veterinarian/schema/veterinarian.interface";
import {TranslateService} from "@ngx-translate/core";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DropdownModule,
    FormsModule,
    ThemeToggleComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  user: DecodedToken | null;
  data: PetOwnerSchemaGet | VeterinarianSchemaResponse = {} as PetOwnerSchemaGet;
  languages: any[] = [
    {label: "English", value: "en", icon:"pi pi-globe"},
    {label: "Spanish", value: "es", icon:"pi pi-globe"},
    {label: "French", value: "fr", icon:"pi pi-globe"},
    {label:"Japanese", value:"ja", icon:"pi pi-globe"},
  ];

  selectedLanguage: any;

  constructor(
    private authService: AuthService,
    private petOwnerService: PetOwnerService,
    private vetService: VeterinarianService,
    private transalateService:TranslateService
  ) {
    this.user = this.authService.decodeToken();
    if (this.user?.user_role === UserType.Owner) {
      this.petOwnerService.getPetOwnerById(this.user?.user_id!)
        .subscribe((petOwner: PetOwnerSchemaGet) => {
          this.data = petOwner;
        });
    }
    else if(this.user?.user_role === UserType.Vet) {
      this.vetService.getVeterinarianById(this.user?.user_id!)
        .subscribe((vet: VeterinarianSchemaResponse) => {
          this.data = vet;
        });
    }

    let defaultLanguage = this.transalateService.getBrowserLang();
    this.selectedLanguage = this.languages.find(l => l.value === defaultLanguage);
  }

  switchLanguage(language: any) {
    this.transalateService.use(language.value);
  }
}
