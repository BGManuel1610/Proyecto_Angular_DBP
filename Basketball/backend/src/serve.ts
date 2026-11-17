import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import { pool } from './config/db';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log('Conexion a PostgreSQL establecida');
  } catch (err) {
    console.error('Error conectando a PostgreSQL:', (err as Error).message);
    console.error(err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(
      `API ejecutandose en http://localhost:${PORT}`
    );
  });
}

startServer();
