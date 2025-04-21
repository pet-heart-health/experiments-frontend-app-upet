import { Injectable } from '@angular/core';
import { UpetApiService } from '../../Api/UpetBackend/upet-api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationSchemaPost, NotificationSchemaGet } from '../schema/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends UpetApiService {
  private apiUrl: string;

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = this.buildUrl('notifications'); // Cambiar a notifications
  }

  // Crear una notificación
  createNotification(notification: NotificationSchemaPost): Observable<NotificationSchemaGet> {
    return this.http.post<NotificationSchemaGet>(this.apiUrl, notification).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las notificaciones
  getNotifications(): Observable<NotificationSchemaGet[]> {
    return this.http.get<NotificationSchemaGet[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener notificaciones por ID de propietario de mascota
  getNotificationsByPetOwnerId(petOwnerId: number): Observable<NotificationSchemaGet[]> {
    return this.http.get<NotificationSchemaGet[]>(`${this.apiUrl}/pet-owner/${petOwnerId}`).pipe(
      catchError(this.handleError)
    );
  }

  getNotificationsByVeterinaryId(veterinaryId: number): Observable<NotificationSchemaGet[]> {
    return this.http.get<NotificationSchemaGet[]>(`${this.apiUrl}/veterinarian/${veterinaryId}`).pipe(
      catchError(this.handleError)
    );
  }


}
