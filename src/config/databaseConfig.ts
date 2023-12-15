import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

export const databaseConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  };