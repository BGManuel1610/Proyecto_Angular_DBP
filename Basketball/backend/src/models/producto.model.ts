import { pool } from '../config/db';

export interface Producto {
  id?: number;
  nombre: string;
  categoria_id?: number | null;
  precio: number;
  stock: number;
  talla?: string | null;
  marca?: string | null;
  fecha_creacion?: Date;
  categoria_nombre?: string;
}

export class ProductoModel {
  static async obtenerTodos(): Promise<Producto[]> {
    const r = await pool.query(
      `SELECT p.*, c.nombre AS categoria_nombre
       FROM productos p LEFT JOIN categorias c ON c.id = p.categoria_id
       ORDER BY p.id`
    );
    return r.rows;
  }
  static async obtenerPorId(id: number): Promise<Producto | null> {
    const r = await pool.query(
      `SELECT p.*, c.nombre AS categoria_nombre
       FROM productos p LEFT JOIN categorias c ON c.id = p.categoria_id
       WHERE p.id = $1`,
      [id]
    );
    return r.rows[0] || null;
  }
  static async crear(p: Producto): Promise<Producto> {
    const r = await pool.query(
      `INSERT INTO productos (nombre, categoria_id, precio, stock, talla, marca)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [p.nombre, p.categoria_id ?? null, p.precio, p.stock, p.talla ?? null, p.marca ?? null]
    );
    return r.rows[0];
  }
  static async actualizar(id: number, p: Producto): Promise<Producto | null> {
    const r = await pool.query(
      `UPDATE productos SET nombre=$1, categoria_id=$2, precio=$3, stock=$4, talla=$5, marca=$6
       WHERE id=$7 RETURNING *`,
      [p.nombre, p.categoria_id ?? null, p.precio, p.stock, p.talla ?? null, p.marca ?? null, id]
    );
    return r.rows[0] || null;
  }
  static async eliminar(id: number): Promise<boolean> {
    const r = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    return (r.rowCount ?? 0) > 0;
  }
}
