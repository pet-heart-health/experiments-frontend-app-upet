import { Component } from '@angular/core';
import {ReviewCardComponent} from "../../../shared/components/review-card/review-card.component";
import {ReviewService} from "../../../core/review/services/review.service";
import {ReviewSchemaGet} from "../../../core/review/schema/review.interface";
import {NgForOf, NgIf} from "@angular/common";

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

  reviews:ReviewSchemaGet[] = [];

  constructor(private reviewsService:ReviewService) {
  }

  ngOnInit() {
    this.reviewsService.getReviews().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
}
