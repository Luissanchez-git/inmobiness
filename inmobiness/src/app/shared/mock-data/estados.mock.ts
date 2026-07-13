export interface Estado {
  id: number;
  nombre: string;
  codigo: string;
}

export const ESTADOS_MOCK: Estado[] = [
  { id: 2, nombre: 'Chihuahua', codigo: 'CHH' },
  { id: 1, nombre: 'Sinaloa', codigo: 'SIN' },
];
