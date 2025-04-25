import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() reviews: ReviewSchemaGet[] = [];

  constructor() {}

}
