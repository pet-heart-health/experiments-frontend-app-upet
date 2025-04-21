export interface MedicalHistorySchemaRequest {
    resultDate: string; // Considera usar Date si necesitas un objeto de fecha
    resultType: string;
    description: string;
    medicalHistoryId: number;
  }
  
  // Interfaz para obtener información de un resultado médico
  export interface MedicalHistorySchemaResponse {
    id: number;
    resultDate: string; // Considera usar Date si necesitas un objeto de fecha
    resultType: string;
    description: string;
    medicalHistoryId: number;
  }