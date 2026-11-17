import { Router } from 'express';
import { obtenerDetallesPorVenta, obtenerDetallePorId } from '../controllers/detalle_venta.controller';
const router = Router();
router.get('/venta/:ventaId', obtenerDetallesPorVenta);
router.get('/:id', obtenerDetallePorId);
export default router;
