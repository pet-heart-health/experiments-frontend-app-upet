// Interfaz para obtener información de una vacuna
export interface VaccineSchemaResponse {
    id: number;
    name: string;
    vaccineDate: string; // Considera usar Date si necesitas un objeto de fecha
    vaccineType: string;
    dose: string;
    location: string;
    medicalHistoryId: number;
}

// Interfaz para crear una nueva vacuna
export interface VaccineSchemaRequest {
    name: string;
    vaccineDate: string; // Considera usar Date si necesitas un objeto de fecha
    vaccineType: string;
    dose: string;
    location: string;
    medicalHistoryId: number;
}
