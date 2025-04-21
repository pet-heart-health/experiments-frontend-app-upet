export interface SmartCollarSchemaGet {
  id:number,
  serial_number: string,
  temperature: number,
  lpm: number,
  battery: number,
  location: {
    latitude: number,
    longitude: number
  },
  pet_id: number|null
}

