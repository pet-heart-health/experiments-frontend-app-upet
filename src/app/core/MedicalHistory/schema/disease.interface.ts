import { SeverityLevelEnum } from "../enum/severity-level.enum";

// Interfaz para obtener información de una enfermedad
export interface DiseaseSchemaResponse {
    id: number;
    name: string;
    medicalHistoryId: number;
    diagnosisDate: string; // Considera usar Date si necesitas un objeto de fecha
    severity: SeverityLevelEnum;
}

// Interfaz para crear una nueva enfermedad
export interface DiseaseSchemaRequest {
    name: string;
    medicalHistoryId: number;
    diagnosisDate: string; // Considera usar Date si necesitas un objeto de fecha
    severity: SeverityLevelEnum;
}
