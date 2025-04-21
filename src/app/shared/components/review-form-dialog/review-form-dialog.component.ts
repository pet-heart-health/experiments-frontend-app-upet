import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {SliderModule} from "primeng/slider";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReviewService} from "../../../core/review/services/review.service";
import {ReviewSchemaPost} from "../../../core/review/schema/review.interface";
import {DecodedToken} from "../../../core/auth/schema/decoded-token.interface";
import {AuthService} from "../../../core/auth/services/auth.service";

@Component({
  selector: 'app-review-form-dialog',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    SliderModule,
    InputTextareaModule
  ],
  templateUrl: './review-form-dialog.component.html',
  styleUrl: './review-form-dialog.component.css'
})
export class ReviewFormDialogComponent {
  @Input() closeDialog!: () => void;
  @Input() vetId!: number;
  myForm:FormGroup = new FormGroup({});
  user:DecodedToken|null;

  constructor(
    private fb:FormBuilder,
    private reviewService:ReviewService,
    private authService:AuthService
    ) {

    this.myForm = this.fb.group({
      stars: new FormControl(0),
      description: new FormControl(''),
    });

    this.user = this.authService.decodeToken();

  }
  submitReview(){
    let request:ReviewSchemaPost = {
      stars: this.myForm.value.stars,
      description: this.myForm.value.description,
      veterinarian_id: this.vetId
    }
    console.log("Review", request);

    const petOwnerId = this.user?.user_id!;
    this.reviewService.createReview(petOwnerId, request).subscribe(() => {
      alert('Review created');
      this.closeDialog();
    });
  }

}
