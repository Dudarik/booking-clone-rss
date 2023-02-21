import * as dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router } from './router/index.js';

// import { sequelize } from './db_settings/index.js';
// import { UsersModel } from './models/UsersModel.js';

dotenv.config();

// console.log(process.env);
// console.log(router);

const PORT = process.env.SERVER_PORT || 7000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

// try {
//   // await sequelize.authenticate();
//   // const users = await UsersModel.findAll();
//   // console.log(JSON.stringify(users));
//   console.log('Connection has been established successfully.');
//   // await sequelize.close();
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
