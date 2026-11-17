"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProveedor = exports.actualizarProveedor = exports.crearProveedor = exports.obtenerProveedorPorId = exports.obtenerProveedores = void 0;
const proveedor_model_1 = require("../models/proveedor.model");
const obtenerProveedores = async (req, res) => {
    const proveedores = await proveedor_model_1.ProveedorModel.obtenerTodos();
    res.json(proveedores);
};
exports.obtenerProveedores = obtenerProveedores;
const obtenerProveedorPorId = async (req, res) => {
    const id = Number(req.params.id);
    const proveedor = await proveedor_model_1.ProveedorModel.obtenerPorId(id);
    if (!proveedor) {
        return res.status(404).json({
            message: 'Proveedor no encontrado'
        });
    }
    res.json(proveedor);
};
exports.obtenerProveedorPorId = obtenerProveedorPorId;
const crearProveedor = async (req, res) => {
    const proveedor = await proveedor_model_1.ProveedorModel.crear(req.body);
    res.status(201).json(proveedor);
};
exports.crearProveedor = crearProveedor;
const actualizarProveedor = async (req, res) => {
    const id = Number(req.params.id);
    const proveedor = await proveedor_model_1.ProveedorModel.actualizar(id, req.body);
    if (!proveedor) {
        return res.status(404).json({
            message: 'Proveedor no encontrado'
        });
    }
    res.json(proveedor);
};
exports.actualizarProveedor = actualizarProveedor;
const eliminarProveedor = async (req, res) => {
    const id = Number(req.params.id);
    const eliminado = await proveedor_model_1.ProveedorModel.eliminar(id);
    if (!eliminado) {
        return res.status(404).json({
            message: 'Proveedor no encontrado'
        });
    }
    res.status(204).send();
};
exports.eliminarProveedor = eliminarProveedor;
//# sourceMappingURL=proveedor.controller.js.map