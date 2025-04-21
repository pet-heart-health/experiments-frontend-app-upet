export interface PetResponse{
    id?:number;
    name?:string;
    petOwnerId?:string;
    species?:string;
    weight?:number;
    birthdate?:string|Date;
    image_url?:string;
    breed?:string;
    gender?:string;
}
