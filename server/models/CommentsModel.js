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
    restaurantid: {
      type: NUMBER,
      foreignKey: true,
    },
    userid: {
      type: NUMBER,
      foreignKey: true,
    },
    commenttitle: STRING,
    commentbody: STRING,
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
