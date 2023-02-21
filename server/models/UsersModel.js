import { sequelize } from '../db_settings/index.js';
import { STRING, NUMBER, BOOLEAN } from 'sequelize';
import { CommentsModel } from './CommentsModel.js';
import { TokenModel } from './TokenModel.js';

const UsersModel = sequelize.define(
  'users',
  {
    uid: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: STRING,
      unique: true,
    },
    password: STRING,
    username: STRING,
    role: {
      type: STRING,
      defaultValue: 'user',
    },
    phonenumber: STRING,
    isactive: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// UsersModel.belongsTo(CommentsModel, {
//   foreignKey: 'userid',
// });

// UsersModel.belongsTo(TokenModel, {
//   foreignKey: 'uid',
// });

export { UsersModel };
