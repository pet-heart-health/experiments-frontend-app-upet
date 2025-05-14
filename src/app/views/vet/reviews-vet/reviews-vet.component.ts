import { Component } from '@angular/core';
import {ReviewCardComponent} from "../../../shared/components/review-card/review-card.component";
import {ReviewService} from "../../../core/review/services/review.service";
import {ReviewSchemaGet} from "../../../core/review/schema/review.interface";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../core/auth/services/auth.service";
import {VeterinarianSchemaResponse} from "../../../core/Veterinarian/schema/veterinarian.interface";
import {VeterinarianService} from "../../../core/Veterinarian/services/veterinarian.service";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";

@Component({
  selector: 'app-reviews-vet',
  standalone: true,
  imports: [
    ReviewCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './reviews-vet.component.html',
  styleUrl: './reviews-vet.component.css'
})
export class ReviewsVetComponent {
  userClaims:DecodedToken = {} as DecodedToken;
  vet:VeterinarianSchemaResponse = {} as VeterinarianSchemaResponse;
  id2 : number = 0;
  reviews:ReviewSchemaGet[] = [];

  constructor(private reviewsService:ReviewService,private authService:AuthService,
  private vetService:VeterinarianService) {
    this.userClaims = this.authService.decodeToken()!;
  }

  ngOnInit() {

    const userId = this.userClaims?.user_id!;
    this.vetService.getVeterinarianById(userId).subscribe((res:VeterinarianSchemaResponse) => {
      this.id2 = res.id;
    });
    /*this.reviewsService.getReviewsByVeterinarianId(this.id2!).subscribe((reviews) => {
      this.reviews = reviews;
    });*/
    this.reviewsService.getReviews().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
}
