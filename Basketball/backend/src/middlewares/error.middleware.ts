import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (
  req: Request,
  res: Response
) => {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error en ${req.method} ${req.originalUrl}:`, error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: 'Error interno del servidor'
  });
};
