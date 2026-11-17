import { pool } from '../config/db';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string | null;
  direccion?: string | null;
  fecha_registro?: Date;
}

export class ClienteModel {
  static async obtenerTodos(): Promise<Cliente[]> {
    const r = await pool.query('SELECT * FROM clientes ORDER BY id');
    return r.rows;
  }
  static async obtenerPorId(id: number): Promise<Cliente | null> {
    const r = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return r.rows[0] || null;
  }
  static async crear(c: Cliente): Promise<Cliente> {
    const r = await pool.query(
      `INSERT INTO clientes (nombre, apellido, email, telefono, direccion)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [c.nombre, c.apellido, c.email, c.telefono ?? null, c.direccion ?? null]
    );
    return r.rows[0];
  }
  static async actualizar(id: number, c: Cliente): Promise<Cliente | null> {
    const r = await pool.query(
      `UPDATE clientes SET nombre=$1, apellido=$2, email=$3, telefono=$4, direccion=$5
       WHERE id=$6 RETURNING *`,
      [c.nombre, c.apellido, c.email, c.telefono ?? null, c.direccion ?? null, id]
    );
    return r.rows[0] || null;
  }
  static async eliminar(id: number): Promise<boolean> {
    const r = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    return (r.rowCount ?? 0) > 0;
  }
}
