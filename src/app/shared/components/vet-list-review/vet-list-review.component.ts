import { Component } from '@angular/core';
import {ReviewService} from "../../../core/review/services/review.service";
import {ReviewSchemaGet} from "../../../core/review/schema/review.interface";
import {NgForOf} from "@angular/common";
import {ReviewCardComponent} from "../review-card/review-card.component";

@Component({
  selector: 'app-vet-list-review',
  standalone: true,
  imports: [
    NgForOf,
    ReviewCardComponent
  ],
  templateUrl: './vet-list-review.component.html',
  styleUrl: './vet-list-review.component.css'
})
export class VetListReviewComponent {

  reviews: ReviewSchemaGet[] = [];

  constructor(private reviewService:ReviewService) {}

  ngOnInit() {
    //CAMBIAR EL ENDPOINT PARA QUE TRAIGA LAS REVIEWS DE UNA VETERINARIA EN ESPECIFICO
    this.reviewService.getReviews().subscribe((data: ReviewSchemaGet[]) => {
      this.reviews = data.reverse();

    });
  }
}
