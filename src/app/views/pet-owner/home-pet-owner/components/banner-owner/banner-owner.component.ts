import { Component } from '@angular/core';
import {DecodedToken} from "../../../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../../../core/auth/services/auth.service";
import {PetOwnerService} from "../../../../../core/PetOwner/services/pet-owner.service";
import {PetOwnerSchemaGet} from "../../../../../core/PetOwner/schema/petowner.interface";

@Component({
  selector: 'app-banner-owner',
  standalone: true,
  imports: [],
  templateUrl: './banner-owner.component.html',
  styleUrl: './banner-owner.component.css'
})
export class BannerOwnerComponent {
  user:DecodedToken | null;
  petOwner:PetOwnerSchemaGet = {} as PetOwnerSchemaGet;

  constructor(
    private authService:AuthService,
    private petOwnerService:PetOwnerService
  ) {
    this.user = authService.decodeToken()!;
  }
  ngOnInit() {
    this.petOwnerService.getPetOwnerById(this.user?.user_id!).subscribe((data) => {
      this.petOwner = data;
    });
  }
}
