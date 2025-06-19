import { Component } from '@angular/core';
import {ReviewCardComponent} from "../../../shared/components/review-card/review-card.component";
import {ReviewService} from "../../../core/review/services/review.service";
import {ReviewSchemaGet} from "../../../core/review/schema/review.interface";
import {NgForOf, NgIf} from "@angular/common";
import { AuthService } from '../../../core/auth/services/auth.service';
import { VeterinarianService } from '../../../core/Veterinarian/services/veterinarian.service';
import { VeterinarianSchemaResponse } from '../../../core/Veterinarian/schema/veterinarian.interface';
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

  constructor(
    private vetService:VeterinarianService,
    private authService:AuthService,
    private reviewsService:ReviewService
  ) {
  }

  ngOnInit() {
    let userClaims = this.authService.decodeToken()!;
    const userId = userClaims?.user_id!;
    this.vetService.getVeterinarianById(userId).subscribe((res:VeterinarianSchemaResponse) => {
      this.reviewsService.getReviewsByVetId(res.id).subscribe((reviews) => {
        this.reviews = reviews;
      });
    });
  }
}
