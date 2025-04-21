import { NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { PetCardComponent } from "../../../shared/components/pet-card/pet-card.component";
import { BannerOwnerComponent } from "./components/banner-owner/banner-owner.component";
import { ListOwnerPetsComponent } from "./components/list-owner-pets/list-owner-pets.component";
import { ListScpecialistsNearbyComponent } from "./components/list-scpecialists-nearby/list-scpecialists-nearby.component";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../core/auth/services/auth.service";

@Component({
  selector: 'app-home-pet-owner',
  standalone: true,
  imports: [
    PetCardComponent,
    BannerOwnerComponent,
    ListOwnerPetsComponent,
    ListScpecialistsNearbyComponent,
    NgClass,
  ],
  templateUrl: './home-pet-owner.component.html',
  styleUrls: ['./home-pet-owner.component.css'] // Cambiado de 'styleUrl' a 'styleUrls'
})
export class HomePetOwnerComponent {


}
