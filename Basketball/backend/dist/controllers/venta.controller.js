"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarVenta = exports.actualizarVenta = exports.crearVenta = exports.obtenerVentaPorId = exports.obtenerVentas = void 0;
const venta_model_1 = require("../models/venta.model");
const obtenerVentas = async (req, res) => {
    const ventas = await venta_model_1.VentaModel.obtenerTodos();
    res.json(ventas);
};
exports.obtenerVentas = obtenerVentas;
const obtenerVentaPorId = async (req, res) => {
    const id = Number(req.params.id);
    const venta = await venta_model_1.VentaModel.obtenerPorId(id);
    if (!venta) {
        return res.status(404).json({
            message: 'Venta no encontrada'
        });
    }
    res.json(venta);
};
exports.obtenerVentaPorId = obtenerVentaPorId;
const crearVenta = async (req, res) => {
    const venta = await venta_model_1.VentaModel.crear(req.body);
    res.status(201).json(venta);
};
exports.crearVenta = crearVenta;
const actualizarVenta = async (req, res) => {
    const id = Number(req.params.id);
    const venta = await venta_model_1.VentaModel.actualizar(id, req.body);
    if (!venta) {
        return res.status(404).json({
            message: 'Venta no encontrada'
        });
    }
    res.json(venta);
};
exports.actualizarVenta = actualizarVenta;
const eliminarVenta = async (req, res) => {
    const id = Number(req.params.id);
    const eliminado = await venta_model_1.VentaModel.eliminar(id);
    if (!eliminado) {
        return res.status(404).json({
            message: 'Venta no encontrada'
        });
    }
    res.status(204).send();
};
exports.eliminarVenta = eliminarVenta;
//# sourceMappingURL=venta.controller.js.map