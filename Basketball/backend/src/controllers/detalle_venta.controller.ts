import { Request, Response } from 'express';
import { DetalleVentaModel } from '../models/detalle_venta.model';

export const obtenerDetallesPorVenta = async (req: Request, res: Response) => {
  const ventaId = Number(req.params.ventaId);
  if (!Number.isInteger(ventaId)) return res.status(400).json({ message: 'ventaId invalido' });
  res.json(await DetalleVentaModel.obtenerPorVenta(ventaId));
};
export const obtenerDetallePorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const d = await DetalleVentaModel.obtenerPorId(id);
  if (!d) return res.status(404).json({ message: 'Detalle no encontrado' });
  res.json(d);
};
