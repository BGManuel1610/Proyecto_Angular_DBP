"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProveedorModel = void 0;
const proveedor_database_1 = require("../config/proveedor.database");
class ProveedorModel {
    static async obtenerTodos() {
        return proveedor_database_1.proveedoresDB;
    }
    static async obtenerPorId(id) {
        return proveedor_database_1.proveedoresDB.find((proveedor) => proveedor.id === id) || null;
    }
    static async crear(proveedor) {
        const nuevoProveedor = {
            ...proveedor,
            id: (0, proveedor_database_1.obtenerSiguienteId)(),
            fecha_creacion: new Date()
        };
        proveedor_database_1.proveedoresDB.push(nuevoProveedor);
        return nuevoProveedor;
    }
    static async actualizar(id, proveedor) {
        const index = proveedor_database_1.proveedoresDB.findIndex((proveedorActual) => {
            return proveedorActual.id === id;
        });
        if (index === -1) {
            return null;
        }
        const proveedorActualizado = {
            ...proveedor_database_1.proveedoresDB[index],
            ...proveedor,
            id
        };
        proveedor_database_1.proveedoresDB[index] = proveedorActualizado;
        return proveedorActualizado;
    }
    static async eliminar(id) {
        const index = proveedor_database_1.proveedoresDB.findIndex((proveedor) => proveedor.id === id);
        if (index === -1) {
            return false;
        }
        proveedor_database_1.proveedoresDB.splice(index, 1);
        return true;
    }
}
exports.ProveedorModel = ProveedorModel;
//# sourceMappingURL=proveedor.model.js.map