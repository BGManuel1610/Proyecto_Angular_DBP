import { pool } from '../config/db';

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion?: string | null;
}

export class CategoriaModel {
  static async obtenerTodos(): Promise<Categoria[]> {
    const r = await pool.query('SELECT * FROM categorias ORDER BY id');
    return r.rows;
  }
  static async obtenerPorId(id: number): Promise<Categoria | null> {
    const r = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
    return r.rows[0] || null;
  }
  static async crear(c: Categoria): Promise<Categoria> {
    const r = await pool.query(
      `INSERT INTO categorias (nombre, descripcion) VALUES ($1,$2) RETURNING *`,
      [c.nombre, c.descripcion ?? null]
    );
    return r.rows[0];
  }
  static async actualizar(id: number, c: Categoria): Promise<Categoria | null> {
    const r = await pool.query(
      `UPDATE categorias SET nombre=$1, descripcion=$2 WHERE id=$3 RETURNING *`,
      [c.nombre, c.descripcion ?? null, id]
    );
    return r.rows[0] || null;
  }
  static async eliminar(id: number): Promise<boolean> {
    const r = await pool.query('DELETE FROM categorias WHERE id = $1', [id]);
    return (r.rowCount ?? 0) > 0;
  }
}
