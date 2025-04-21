// schemas/NotificationSchemaPost.ts
export interface NotificationSchemaPost {
  petOwnerId: number;
  type: string;
  message: string;
  datetime: string; // Cambiar a Date si prefieres trabajar con objetos Date
}

// schemas/NotificationSchemaGet.ts
export interface NotificationSchemaGet {
  id: number;
  type: string;
  message: string;
  datetime: string; // Cambiar a Date si prefieres trabajar con objetos Date
}
