"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_controller_1 = require("../controllers/venta.controller");
const router = (0, express_1.Router)();
router.get('/', venta_controller_1.obtenerVentas);
router.get('/:id', venta_controller_1.obtenerVentaPorId);
router.post('/', venta_controller_1.crearVenta);
router.put('/:id', venta_controller_1.actualizarVenta);
router.delete('/:id', venta_controller_1.eliminarVenta);
exports.default = router;
//# sourceMappingURL=venta.routes.js.map