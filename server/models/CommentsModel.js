import { sequelize } from '../db_settings/index.js';
import { STRING, NUMBER } from 'sequelize';

const CommentsModel = sequelize.define(
  'comments',
  {
    id: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    rid: {
      type: NUMBER,
      foreignKey: true,
    },
    uid: {
      type: NUMBER,
      foreignKey: true,
    },
    title: STRING,
    body: STRING,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// CommentsModel.hasMany(RestaurantsModel, {
//   foreignKey: 'rid',
// });
// CommentsModel.hasMany(UsersModel, {
//   foreignKey: 'uid',
// });

export { CommentsModel };
