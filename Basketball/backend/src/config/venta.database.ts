import type { Venta } from '../models/venta.model';

export const ventasDB: Venta[] = [
  {
    id: 1,
    producto: 'Carne',
    cantidad: 2,
    precio: 16000,
    total: 32000,
    fecha_creacion: new Date('2026-10-05T18:00:00.000Z')
  },
  {
    id: 2,
    producto: 'Pollo',
    cantidad: 3,
    precio: 8000,
    total: 32000,
    fecha_creacion: new Date('2026-10-05T18:05:00.000Z')
  }
];

let siguienteId = ventasDB.length + 1;

export const obtenerSiguienteId = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
