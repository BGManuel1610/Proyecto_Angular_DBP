import { pool } from '../config/db';

export interface Proveedor {
  id?: number;
  nombre: string;
  telefono: string;
  direccion: string;
  email: string;
  fecha_creacion?: Date;
}

export class ProveedorModel {

  static async obtenerTodos(): Promise<Proveedor[]> {
    const result = await pool.query('SELECT * FROM proveedores ORDER BY id');
    return result.rows;
  }

  
  static async obtenerPorId(id: number): Promise<Proveedor | null> {
    const result = await pool.query('SELECT * FROM proveedores WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async crear(proveedor: Proveedor): Promise<Proveedor> {
    const result = await pool.query(
      `INSERT INTO proveedores (nombre, telefono, direccion, email)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [proveedor.nombre, proveedor.telefono, proveedor.direccion, proveedor.email]
    );
    return result.rows[0];
  }

  static async actualizar(id: number, proveedor: Proveedor): Promise<Proveedor | null> {
    const result = await pool.query(
      `UPDATE proveedores SET nombre = $1, telefono = $2, direccion = $3, email = $4
       WHERE id = $5 RETURNING *`,
      [proveedor.nombre, proveedor.telefono, proveedor.direccion, proveedor.email, id]
    );
    return result.rows[0] || null;
  }

  static async eliminar(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM proveedores WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

