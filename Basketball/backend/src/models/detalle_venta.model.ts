import { pool } from '../config/db';

export interface DetalleVenta {
  id?: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  producto_nombre?: string;
}

export class DetalleVentaModel {
  static async obtenerPorVenta(ventaId: number): Promise<DetalleVenta[]> {
    const r = await pool.query(
      `SELECT dv.*, p.nombre AS producto_nombre
       FROM detalle_ventas dv JOIN productos p ON p.id = dv.producto_id
       WHERE dv.venta_id = $1 ORDER BY dv.id`,
      [ventaId]
    );
    return r.rows;
  }
  static async obtenerPorId(id: number): Promise<DetalleVenta | null> {
    const r = await pool.query('SELECT * FROM detalle_ventas WHERE id = $1', [id]);
    return r.rows[0] || null;
  }
}
