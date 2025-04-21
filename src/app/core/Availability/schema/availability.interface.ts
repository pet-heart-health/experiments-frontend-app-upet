// schemas/AvailabilitySchema.ts
export interface AvailabilitySchema {
  date: string; // Cambiar a Date si prefieres trabajar con objetos Date
  start_time: string; // Cambiar a Date si prefieres trabajar con objetos Date
  end_time: string;   // Cambiar a Date si prefieres trabajar con objetos Date
  veterinarian_id: number;
  is_available?: boolean; // Opcional, ya que tiene un valor predeterminado
}
