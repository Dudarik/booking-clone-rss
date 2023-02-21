import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.DB_URL);
export const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});
