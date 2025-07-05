import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../core/auth/services/auth.service";
import {PetOwnerSchemaGet} from "../../../core/PetOwner/schema/petowner.interface";
import {PetOwnerService} from "../../../core/PetOwner/services/pet-owner.service";
import {UserType} from "../../../core/auth/enum/UserType.enum";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {VeterinarianSchemaResponse} from "../../../core/Veterinarian/schema/veterinarian.interface";
import {Subscription} from "rxjs";
import {ThemeService} from "../../service/theme.service";
import {Button} from "primeng/button";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    Button
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  user: DecodedToken | null;
  data: PetOwnerSchemaGet | VeterinarianSchemaResponse = {} as PetOwnerSchemaGet;
  isDarkTheme = false;
  private themeSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private petOwnerService: PetOwnerService,
    private vetService: VeterinarianService,
    private themeService: ThemeService

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


  }

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkTheme$
      .subscribe(isDark => { this.isDarkTheme = isDark; });
  }
  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
