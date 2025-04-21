import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ReviewSchemaPost, ReviewSchemaGet } from '../schema/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('reviews'); // Cambiar a reviews
  }

  // Crear una reseña
  createReview(petOwnerId: number, review: ReviewSchemaPost): Observable<ReviewSchemaGet> {
    return this.http.post<ReviewSchemaGet>(`${this.apiUrl}/${petOwnerId}`, review).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las reseñas
  getReviews(): Observable<ReviewSchemaGet[]> {
    return this.http.get<ReviewSchemaGet[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


}
