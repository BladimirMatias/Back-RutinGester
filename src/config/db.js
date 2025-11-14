import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Soporta DATABASE_URL (Render/Heroku) y variables separadas locales
let sequelizeInstance;

if (process.env.DATABASE_URL) {
  sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'false' ? false : { require: true, rejectUnauthorized: false },
    },
  });
} else {
  sequelizeInstance = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
    }
  );
}

export const sequelize = sequelizeInstance;
