import { Injectable } from '@angular/core';
import {UpetApiService} from "../Api/UpetBackend/upet-api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReminderSchemaPost} from "./ReminderSchemaPost";

@Injectable({
  providedIn: 'root'
})
export class ReminderService extends UpetApiService{
  apiUrl: string;

  constructor(private httpClient:HttpClient) {
    super(httpClient);
    this.apiUrl = this.buildUrl("reminders");
  }

  createReminder(reminder:ReminderSchemaPost):Observable<void>{
    return this.httpClient.post<void>(`${this.apiUrl}`, reminder);
  }
}
