import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT || 5433),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '1234',
  database: process.env.PGDATABASE || 'basketball',
  ssl: false,
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000
});

pool.on('error', (err) => {
  console.error('PG pool error:', err.message);
});

export async function initDatabase(): Promise<void> {
  const statements = [
    `DROP TABLE IF EXISTS detalle_ventas CASCADE`,
    `DROP TABLE IF EXISTS ventas CASCADE`,
    `DROP TABLE IF EXISTS productos CASCADE`,
    `DROP TABLE IF EXISTS categorias CASCADE`,
    `DROP TABLE IF EXISTS clientes CASCADE`,
    `DROP TABLE IF EXISTS proveedores CASCADE`,
    `CREATE TABLE categorias (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(50) NOT NULL UNIQUE,
      descripcion TEXT
    )`,
    `CREATE TABLE clientes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      telefono VARCHAR(20),
      direccion TEXT,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
      precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
      stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
      talla VARCHAR(20),
      marca VARCHAR(50),
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE ventas (
      id SERIAL PRIMARY KEY,
      cliente_id INT REFERENCES clientes(id) ON DELETE RESTRICT,
      fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
      estado VARCHAR(30) DEFAULT 'Completada'
    )`,
    `CREATE TABLE detalle_ventas (
      id SERIAL PRIMARY KEY,
      venta_id INT REFERENCES ventas(id) ON DELETE CASCADE,
      producto_id INT REFERENCES productos(id) ON DELETE RESTRICT,
      cantidad INT NOT NULL CHECK (cantidad > 0),
      precio_unitario NUMERIC(10, 2) NOT NULL CHECK (precio_unitario >= 0),
      subtotal NUMERIC(10, 2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
    )`
  ];
  for (const sql of statements) {
    await pool.query(sql);
  }
}
