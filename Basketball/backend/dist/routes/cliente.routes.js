"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_controller_1 = require("../controllers/cliente.controller");
const router = (0, express_1.Router)();
router.get('/', cliente_controller_1.obtenerClientes);
router.get('/:id', cliente_controller_1.obtenerClientePorId);
router.post('/', cliente_controller_1.crearCliente);
router.put('/:id', cliente_controller_1.actualizarCliente);
router.delete('/:id', cliente_controller_1.eliminarCliente);
exports.default = router;
//# sourceMappingURL=cliente.routes.js.map