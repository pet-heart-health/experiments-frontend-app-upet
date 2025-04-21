import {Component, Input} from '@angular/core';
import {ReviewService} from "../../../core/review/services/review.service";
import {ReviewSchemaGet} from "../../../core/review/schema/review.interface";
import {JsonPipe, NgForOf} from "@angular/common";
import {formatDateToYYYYMMDD, formatDateToYYYYMMDDHHMM} from "../../helpers/date.formater";

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review!: ReviewSchemaGet;

  ngOnInit() {
      this.review.review_time = formatDateToYYYYMMDDHHMM(new Date(this.review.review_time));
  }
}
