// schemas/AppointmentSchemaCreate.ts
export interface AppointmentSchemaCreate {
  date_day: string; // Cambiar a Date si prefieres trabajar con objetos Date
  description: string;
  start_time: string; // Cambiar a Date si prefieres trabajar con objetos Date
  pet_id: number;
  veterinarian_id: number;
}

// schemas/AppointmentSchemaUpdate.ts
export interface AppointmentSchemaUpdate {
  diagnosis: string;
  treatment: string;
}

// schemas/AppointmentSchemaGet.ts
export interface AppointmentSchemaGet {
  id: number;
  date_day: string; // Cambiar a Date si prefieres trabajar con objetos Date
  diagnosis?: string; // Opcional
  treatment?: string; // Opcional
  description: string;
  start_time: string; // Cambiar a Date si prefieres trabajar con objetos Date
  end_time: string; // Cambiar a Date si prefieres trabajar con objetos Date
  pet_id: number;
  veterinarian_id: number;
  status: string;
}
