import { SubscriptionType } from "../enum/subscriptionType.enum";

// Interface para crear un nuevo dueño de mascota
export interface PetOwnerSchemaPost {
    numberPhone: string;
    location: string;
  }
  
  // Interface para actualizar información del dueño de mascota
  export interface PetOwnerUpdateInformation {
    numberPhone: string;
    location: string;
    name: string;
  }
  
  // Interface para obtener información del dueño de mascota
  export interface PetOwnerSchemaGet {
    id: number;
    name: string;
    numberPhone: string;
    image_url: string;
    location: string;
    subscriptionType: SubscriptionType;
  }

  