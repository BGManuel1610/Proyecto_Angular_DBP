"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaModel = void 0;
const venta_database_1 = require("../config/venta.database");
class VentaModel {
    static async obtenerTodos() {
        return venta_database_1.ventasDB;
    }
    static async obtenerPorId(id) {
        return venta_database_1.ventasDB.find((venta) => venta.id === id) || null;
    }
    static async crear(venta) {
        const nuevaVenta = {
            ...venta,
            id: (0, venta_database_1.obtenerSiguienteId)(),
            fecha_creacion: new Date()
        };
        venta_database_1.ventasDB.push(nuevaVenta);
        return nuevaVenta;
    }
    static async actualizar(id, venta) {
        const index = venta_database_1.ventasDB.findIndex((ventaActual) => {
            return ventaActual.id === id;
        });
        if (index === -1) {
            return null;
        }
        const ventaActualizada = {
            ...venta_database_1.ventasDB[index],
            ...venta,
            id
        };
        venta_database_1.ventasDB[index] = ventaActualizada;
        return ventaActualizada;
    }
    static async eliminar(id) {
        const index = venta_database_1.ventasDB.findIndex((venta) => venta.id === id);
        if (index === -1) {
            return false;
        }
        venta_database_1.ventasDB.splice(index, 1);
        return true;
    }
}
exports.VentaModel = VentaModel;
//# sourceMappingURL=venta.model.js.map