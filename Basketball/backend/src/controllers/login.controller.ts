import { Request, Response } from 'express';
import { LoginModel } from '../models/login.model';

export const login = async (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body ?? {};
  const ok = await LoginModel.login(usuario, contrasena);
  res.json({ ok });
};
