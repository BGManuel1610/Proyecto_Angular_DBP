"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = void 0;
const cliente_database_1 = require("../config/cliente.database");
class ClienteModel {
    static async obtenerTodos() {
        return cliente_database_1.clientesDB;
    }
    static async obtenerPorId(id) {
        return cliente_database_1.clientesDB.find((cliente) => cliente.id === id) || null;
    }
    static async crear(cliente) {
        const nuevoCliente = {
            ...cliente,
            id: (0, cliente_database_1.obtenerSiguienteId)(),
            fecha_creacion: new Date()
        };
        cliente_database_1.clientesDB.push(nuevoCliente);
        return nuevoCliente;
    }
    static async actualizar(id, cliente) {
        const index = cliente_database_1.clientesDB.findIndex((clienteActual) => {
            return clienteActual.id === id;
        });
        if (index === -1) {
            return null;
        }
        const clienteActualizado = {
            ...cliente_database_1.clientesDB[index],
            ...cliente,
            id
        };
        cliente_database_1.clientesDB[index] = clienteActualizado;
        return clienteActualizado;
    }
    static async eliminar(id) {
        const index = cliente_database_1.clientesDB.findIndex((cliente) => cliente.id === id);
        if (index === -1) {
            return false;
        }
        cliente_database_1.clientesDB.splice(index, 1);
        return true;
    }
}
exports.ClienteModel = ClienteModel;
//# sourceMappingURL=cliente.model.js.map