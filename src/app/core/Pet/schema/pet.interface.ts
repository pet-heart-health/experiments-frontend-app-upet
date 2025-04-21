import { GenderEnum } from "../enum/gender.enum";
import { SpecieEnum } from "../enum/specie.enum";

// schemas/PetSchemaPost.ts
export interface PetSchemaRequest {
  name: string;
  breed: string;
  species: SpecieEnum; // Asegúrate de definir este enum
  weight: number; // Debe ser mayor a 0, validación se puede hacer en el frontend
  birthdate: string; // Cambiar a Date si prefieres trabajar con objetos Date
  image_url: string;
  gender: GenderEnum; // Asegúrate de definir este enum
}

// schemas/PetSchemaResponse.ts
export interface PetSchemaResponse {
  id: number;
  name: string;
  petOwnerId: number;
  breed: string;
  species: SpecieEnum; // Asegúrate de definir este enum
  weight: number;
  birthdate: string; // Cambiar a Date si prefieres trabajar con objetos Date
  image_url: string;
  gender: GenderEnum; // Asegúrate de definir este enum
}
