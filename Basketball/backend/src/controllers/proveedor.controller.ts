import { Request, Response } from 'express';
import { ProveedorModel } from '../models/proveedor.model';
import { esTextoValido } from '../utils/validacion';

export const obtenerProveedores = async (req: Request, res: Response) => {
  const proveedores = await ProveedorModel.obtenerTodos();

  res.json(proveedores);
};

export const obtenerProveedorPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const proveedor = await ProveedorModel.obtenerPorId(id);

  if (!proveedor) {
    return res.status(404).json({
      message: 'Proveedor no encontrado'
    });
  }

  res.json(proveedor);
};

export const crearProveedor = async (req: Request, res: Response) => {
  const { nombre, telefono, direccion, email } = req.body ?? {};

  if (
    !esTextoValido(nombre) ||
    !esTextoValido(telefono) ||
    !esTextoValido(direccion) ||
    !esTextoValido(email)
  ) {
    return res.status(400).json({
      message: 'Los campos nombre, telefono, direccion y email son obligatorios'
    });
  }

  const proveedor = await ProveedorModel.crear(req.body);

  res.status(201).json(proveedor);
};

export const actualizarProveedor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const { nombre, telefono, direccion, email } = req.body ?? {};

  if (
    !esTextoValido(nombre) ||
    !esTextoValido(telefono) ||
    !esTextoValido(direccion) ||
    !esTextoValido(email)
  ) {
    return res.status(400).json({
      message: 'Los campos nombre, telefono, direccion y email son obligatorios'
    });
  }

  const proveedor = await ProveedorModel.actualizar(id, req.body);

  if (!proveedor) {
    return res.status(404).json({
      message: 'Proveedor no encontrado'
    });
  }

  res.json(proveedor);
};

export const eliminarProveedor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      message: 'El id debe ser un numero entero'
    });
  }

  const eliminado = await ProveedorModel.eliminar(id);

  if (!eliminado) {
    return res.status(404).json({
      message: 'Proveedor no encontrado'
    });
  }

  res.status(204).send();
};
