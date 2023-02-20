import { sequelize } from '../db_settings/index.js';
import { STRING, NUMBER } from 'sequelize';
import { CommentsModel } from './CommentsModel.js';

const UsersModel = sequelize.define(
  'users',
  {
    uid: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: STRING,
    password: STRING,
    username: STRING,
    role: {
      type: STRING,
      defaultValue: 'user',
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

UsersModel.belongsTo(CommentsModel, {
  foreignKey: 'userid',
});

export { UsersModel };
