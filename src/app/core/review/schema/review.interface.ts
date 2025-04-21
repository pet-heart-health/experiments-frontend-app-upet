// schemas/ReviewSchemaPost.ts
export interface ReviewSchemaPost {
    description: string;
    stars: number;
    veterinarian_id: number;
}

// schemas/ReviewSchemaGet.ts
export interface ReviewSchemaGet {
    id: number;
    description: string;
    stars: number;
    review_time: string; // Puedes cambiar a Date si prefieres trabajar con objetos Date
    image_url: string;
    pet_owner_name: string;
}
