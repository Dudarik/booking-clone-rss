import { sequelize } from '../db_settings/index.js';
import { STRING, NUMBER } from 'sequelize';
import { UsersModel } from './UsersModel.js';

const TokenModel = sequelize.define(
  'tokens',
  {
    id: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: NUMBER,
      foreignKey: true,
    },
    refreshtoken: {
      type: STRING,
      require: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// TokenModel.belongsTo(UsersModel, {
//   foreignKey: 'uid',
// });

export { TokenModel };
