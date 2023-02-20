import express from 'express';
import cors from 'cors';
import { sequelize } from './db_settings/index.js';
import { UsersModel } from './models/UsersModel.js';

import * as dotenv from 'dotenv';
dotenv.config();

// console.log(process.env);

const PORT = process.env.SERVER_PORT || 7000;
const app = express(cors());

try {
  await sequelize.authenticate();
  const users = await UsersModel.findAll();
  console.log(JSON.stringify(users));
  console.log('Connection has been established successfully.');
  await sequelize.close();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
