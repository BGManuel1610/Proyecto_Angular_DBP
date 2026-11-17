"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cliente_routes_1 = __importDefault(require("./routes/cliente.routes"));
const venta_routes_1 = __importDefault(require("./routes/venta.routes"));
const proveedor_routes_1 = __importDefault(require("./routes/proveedor.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'OK'
    });
});
app.use('/api/v1/clientes', cliente_routes_1.default);
app.use('/api/v1/ventas', venta_routes_1.default);
app.use('/api/v1/proveedores', proveedor_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map