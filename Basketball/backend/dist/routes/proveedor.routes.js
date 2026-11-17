"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_controller_1 = require("../controllers/proveedor.controller");
const router = (0, express_1.Router)();
router.get('/', proveedor_controller_1.obtenerProveedores);
router.get('/:id', proveedor_controller_1.obtenerProveedorPorId);
router.post('/', proveedor_controller_1.crearProveedor);
router.put('/:id', proveedor_controller_1.actualizarProveedor);
router.delete('/:id', proveedor_controller_1.eliminarProveedor);
exports.default = router;
//# sourceMappingURL=proveedor.routes.js.map