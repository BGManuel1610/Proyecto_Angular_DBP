import { Request, Response } from 'express';
import { ClienteModel } from '../models/cliente.model';
import { esTextoValido } from '../utils/validacion';

export const obtenerClientes = async (_req: Request, res: Response) => {
  res.json(await ClienteModel.obtenerTodos());
};
export const obtenerClientePorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const c = await ClienteModel.obtenerPorId(id);
  if (!c) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(c);
};
export const crearCliente = async (req: Request, res: Response) => {
  const { nombre, apellido, email } = req.body ?? {};
  if (!esTextoValido(nombre) || !esTextoValido(apellido) || !esTextoValido(email)) {
    return res.status(400).json({ message: 'nombre, apellido y email son obligatorios' });
  }
  res.status(201).json(await ClienteModel.crear(req.body));
};
export const actualizarCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  const { nombre, apellido, email } = req.body ?? {};
  if (!esTextoValido(nombre) || !esTextoValido(apellido) || !esTextoValido(email)) {
    return res.status(400).json({ message: 'nombre, apellido y email son obligatorios' });
  }
  const c = await ClienteModel.actualizar(id, req.body);
  if (!c) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(c);
};
export const eliminarCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'id invalido' });
  if (!(await ClienteModel.eliminar(id))) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.status(204).send();
};
