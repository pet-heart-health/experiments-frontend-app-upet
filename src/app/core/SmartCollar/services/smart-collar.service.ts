import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UpetApiService} from "../../Api/UpetBackend/upet-api.service";
import {SmartCollarSchemaGet} from "../schema/smart-collar.interface";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SmartCollarService extends UpetApiService{
  private apiUrl: string;
  constructor(http:HttpClient) {
      super(http);
      this.apiUrl = this.buildUrl('');
  }

  //Obtener todos los collares inteligentes
  getSmartCollars():Observable<SmartCollarSchemaGet[]>{
    return this.http.get<SmartCollarSchemaGet[]>(this.apiUrl+"smart-collars").pipe(
      catchError(this.handleError)
    );
  }

  //Asignar un collar inteligente a una mascota
  assignSmartCollar(petId: number|null, smartCollarId: number){
    return this.http.put(`${this.apiUrl}change_pet_association/${smartCollarId}/${petId}`, null).pipe(
      catchError(this.handleError)
    );
  }

  getSmartCollarByPetId(petId: number):Observable<SmartCollarSchemaGet[]>{
    return this.http.get<SmartCollarSchemaGet[]>(`${this.apiUrl}smart-collars/pet/${petId}`).pipe(
      catchError(this.handleError)
    );
  }

}
