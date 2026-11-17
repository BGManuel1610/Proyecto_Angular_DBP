import { pool } from '../config/db';

export interface DetalleVenta {
  id?: number;
  venta_id?: number;
  producto_id: number;
  cantidad: number;
  precio_unitario?: number;
  subtotal?: number;
  producto_nombre?: string;
}

export interface Venta {
  id?: number;
  cliente_id?: number | null;
  fecha_venta?: Date;
  total?: number;
  estado?: string;
  cliente_nombre?: string;
  detalles?: DetalleVenta[];
}

export class VentaModel {
  static async obtenerTodos(): Promise<Venta[]> {
    const r = await pool.query(
      `SELECT v.*, (c.nombre || ' ' || c.apellido) AS cliente_nombre
       FROM ventas v LEFT JOIN clientes c ON c.id = v.cliente_id
       ORDER BY v.id`
    );
    return r.rows;
  }

  static async obtenerPorId(id: number): Promise<Venta | null> {
    const v = await pool.query(
      `SELECT v.*, (c.nombre || ' ' || c.apellido) AS cliente_nombre
       FROM ventas v LEFT JOIN clientes c ON c.id = v.cliente_id
       WHERE v.id = $1`,
      [id]
    );
    if (!v.rows[0]) return null;
    const d = await pool.query(
      `SELECT dv.*, p.nombre AS producto_nombre
       FROM detalle_ventas dv JOIN productos p ON p.id = dv.producto_id
       WHERE dv.venta_id = $1 ORDER BY dv.id`,
      [id]
    );
    return { ...v.rows[0], detalles: d.rows };
  }

  static async crear(venta: Venta): Promise<Venta> {
    const detalles = venta.detalles ?? [];
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      let total = 0;
      const lineas: Array<DetalleVenta & { precio_unitario: number }> = [];
      for (const d of detalles) {
        const prod = await client.query('SELECT precio, stock FROM productos WHERE id = $1 FOR UPDATE', [d.producto_id]);
        if (!prod.rows[0]) throw new Error(`Producto ${d.producto_id} no encontrado`);
        if (Number(prod.rows[0].stock) < d.cantidad) throw new Error(`Stock insuficiente para producto ${d.producto_id}`);
        const precio = Number(prod.rows[0].precio);
        total += precio * d.cantidad;
        lineas.push({ ...d, precio_unitario: precio });
      }
      const vr = await client.query(
        `INSERT INTO ventas (cliente_id, total, estado) VALUES ($1,$2,$3) RETURNING *`,
        [venta.cliente_id ?? null, total, venta.estado ?? 'Completada']
      );
      const vrow = vr.rows[0];
      for (const l of lineas) {
        await client.query(
          `INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario)
           VALUES ($1,$2,$3,$4)`,
          [vrow.id, l.producto_id, l.cantidad, l.precio_unitario]
        );
        await client.query('UPDATE productos SET stock = stock - $1 WHERE id = $2', [l.cantidad, l.producto_id]);
      }
      await client.query('COMMIT');
      return (await this.obtenerPorId(vrow.id))!;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  static async eliminar(id: number): Promise<boolean> {
    const r = await pool.query('DELETE FROM ventas WHERE id = $1', [id]);
    return (r.rowCount ?? 0) > 0;
  }
}
