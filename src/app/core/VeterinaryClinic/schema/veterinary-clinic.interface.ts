// schemas/VeterinaryClinicSchemaPost.ts
export interface VeterinaryClinicSchemaPost {
    name: string;
    location: string;
    phone_number: string;
    description: string;
    office_hours_start: string; // Cambiar a Date si prefieres trabajar con objetos Date
    office_hours_end: string;   // Cambiar a Date si prefieres trabajar con objetos Date
}

// schemas/VeterinaryClinicSchemaGet.ts
export interface VeterinaryClinicSchemaGet {
    id: number;
    name: string;
    location: string;
    services: string; // Asegúrate de que este campo sea coherente con tu lógica de negocio
    image_url: string;
    description: string;
    phone_number: string;
    office_hours_start: string; // Cambiar a Date si prefieres trabajar con objetos Date
    office_hours_end: string;   // Cambiar a Date si prefieres trabajar con objetos Date
}
