import { Request, Response } from 'express';
import { ProductoModel } from '../models/producto.model';
import { esNumeroValido, esTextoValido } from '../utils/validacion';

export const obtenerProductos = async (_req: Request, res: Response) => {
  res.json(await ProductoModel.obtenerTodos());
};
export const obtenerProductoPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const p = await ProductoModel.obtenerPorId(id);
  if (!p) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(p);
};
export const crearProducto = async (req: Request, res: Response) => {
  const { nombre, precio, stock } = req.body ?? {};
  if (!esTextoValido(nombre)) return res.status(400).json({ message: 'nombre es obligatorio' });
  if (!esNumeroValido(precio) || precio < 0) return res.status(400).json({ message: 'precio invalido' });
  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return res.status(400).json({ message: 'stock invalido' });
  res.status(201).json(await ProductoModel.crear(req.body));
};
export const actualizarProducto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const { nombre, precio, stock } = req.body ?? {};
  if (!esTextoValido(nombre)) return res.status(400).json({ message: 'nombre es obligatorio' });
  if (!esNumeroValido(precio) || precio < 0) return res.status(400).json({ message: 'precio invalido' });
  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return res.status(400).json({ message: 'stock invalido' });
  const p = await ProductoModel.actualizar(id, req.body);
  if (!p) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(p);
};
export const eliminarProducto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  if (!(await ProductoModel.eliminar(id))) return res.status(404).json({ message: 'Producto no encontrado' });
  res.status(204).send();
};
