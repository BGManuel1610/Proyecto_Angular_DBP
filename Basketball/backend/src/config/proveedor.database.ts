
import type { Proveedor } from '../models/proveedor.model';

export const proveedoresDB: Proveedor[] = [
  {
    id: 1,
    nombre: 'Frigonel SAS',
    telefono: '3001234589',
    direccion: 'Bogota',
    email: 'gerencia@frigonel.com',
    fecha_creacion: new Date('2026-10-05T18:00:00.000Z')
  },
  {
    id: 2,
    nombre: 'surtiaves JM',
    telefono: '3109876698',
    direccion: 'Medellin',
    email: 'gerencia@surtiaves.com',
    fecha_creacion: new Date('2026-10-05T18:05:00.000Z')
  }
];

let siguienteId = proveedoresDB.length + 1;

export const obtenerSiguienteId = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
