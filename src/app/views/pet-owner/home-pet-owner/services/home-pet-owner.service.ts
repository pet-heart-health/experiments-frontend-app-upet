import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { PetSchemaResponse } from '../../../../core/Pet/schema/pet.interface';

@Injectable({
  providedIn: 'root'
})
export class HomePetOwnerService {

  basePath = "https://upetbackendapi.onrender.com";

   constructor(private http:HttpClient) {}

   getMyPets(petOwnerId:number):Observable<PetSchemaResponse[]>{
    const resource = `/api/v1/pets/${petOwnerId}`;
    let pets:PetSchemaResponse[] = [];
    return this.http.get<PetSchemaResponse[]>(`${this.basePath}${resource}`);
  }

  deletePet(petId:number){
    const resource = `/api/v1/pets/${petId}`;
    return this.http.delete(`${this.basePath}${resource}`);
  }
  createPet(petData:any, petOwnerId:number){
    const resource = `/api/v1/pets/${petOwnerId}`;
    return this.http.post(`${this.basePath}${resource}`, petData);
  }
  updatePet(petData:any, petId:number){
    const resource = `/api/v1/pets/${petId}`;
    return this.http.put(`${this.basePath}${resource}`, petData);
  }

}
