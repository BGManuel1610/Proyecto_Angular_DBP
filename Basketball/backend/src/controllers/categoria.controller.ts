import { Request, Response } from 'express';
import { CategoriaModel } from '../models/categoria.model';
import { esTextoValido } from '../utils/validacion';

export const obtenerCategorias = async (_req: Request, res: Response) => {
  res.json(await CategoriaModel.obtenerTodos());
};
export const obtenerCategoriaPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const c = await CategoriaModel.obtenerPorId(id);
  if (!c) return res.status(404).json({ message: 'Categoria no encontrada' });
  res.json(c);
};
export const crearCategoria = async (req: Request, res: Response) => {
  const { nombre } = req.body ?? {};
  if (!esTextoValido(nombre)) return res.status(400).json({ message: 'nombre es obligatorio' });
  res.status(201).json(await CategoriaModel.crear(req.body));
};
export const actualizarCategoria = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  if (!esTextoValido(req.body?.nombre)) return res.status(400).json({ message: 'nombre es obligatorio' });
  const c = await CategoriaModel.actualizar(id, req.body);
  if (!c) return res.status(404).json({ message: 'Categoria no encontrada' });
  res.json(c);
};
export const eliminarCategoria = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  if (!(await CategoriaModel.eliminar(id))) return res.status(404).json({ message: 'Categoria no encontrada' });
  res.status(204).send();
};
