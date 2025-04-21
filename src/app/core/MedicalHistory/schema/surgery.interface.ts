// Interfaz para crear una nueva cirugía
export interface SurgerySchemaRequest {
    surgeryDate: string; // Considera usar Date si necesitas un objeto de fecha
    description: string;
    medicalHistoryId: number;
  }
  
  // Interfaz para obtener información de una cirugía
  export interface SurgerySchemaResponse {
    id: number;
    surgeryDate: string; // Considera usar Date si necesitas un objeto de fecha
    description: string;
    medicalHistoryId: number;
  }