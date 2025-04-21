export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque los meses son indexados desde 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateToYYYYMMDDHHMM(date:Date):string{
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque los meses son indexados desde 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDateToMonth(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

export function formatTimeTo12Hour(timeString: string): string {
  // Extraer horas y minutos de la cadena
  const [hours, minutes] = timeString.split(':').map(Number);

  // Convertir a formato de 12 horas
  const period = hours >= 12 ? 'P.M.' : 'A.M.';
  const formattedHours = hours % 12 || 12; // Cambiar 0 a 12 para el mediodía y medianoche
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Asegurarse de que los minutos tengan dos dígitos

  return `${formattedHours}:${formattedMinutes} ${period}`;
}
