import { Request, Response } from 'express';
import { VentaModel } from '../models/venta.model';

export const obtenerVentas = async (_req: Request, res: Response) => {
  res.json(await VentaModel.obtenerTodos());
};
export const obtenerVentaPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const v = await VentaModel.obtenerPorId(id);
  if (!v) return res.status(404).json({ message: 'Venta no encontrada' });
  res.json(v);
};
export const crearVenta = async (req: Request, res: Response) => {
  const { detalles } = req.body ?? {};
  if (!Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({ message: 'detalles es obligatorio (array no vacio)' });
  }
  try {
    const v = await VentaModel.crear(req.body);
    res.status(201).json(v);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};
export const actualizarVenta = async (_req: Request, res: Response) => {
  res.status(405).json({ message: 'Actualizar venta no soportado; cree una nueva venta' });
};
export const eliminarVenta = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  if (!(await VentaModel.eliminar(id))) return res.status(404).json({ message: 'Venta no encontrada' });
  res.status(204).send();
};
