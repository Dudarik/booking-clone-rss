import { sequelize } from '../db_settings/index.js';
import { STRING, NUMBER } from 'sequelize';
import { TablesModel } from './TablesModel.js';
import { CommentsModel } from './CommentsModel.js';

const RestaurantsModel = sequelize.define(
  'restaurants',
  {
    rid: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: STRING,
    address: STRING,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// RestaurantsModel.hasMany(TablesModel, { foreignKey: 'restaurantid' });
// RestaurantsModel.hasMany(CommentsModel, { foreignKey: 'restaurantid' });

export { RestaurantsModel };
