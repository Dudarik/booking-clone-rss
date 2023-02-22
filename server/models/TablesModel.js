import { sequelize } from '../db_settings/index.js';
import { STRING, NUMBER } from 'sequelize';
// import { RestaurantsModel } from './RestaurantsModel.js';

const TablesModel = sequelize.define(
  'tables',
  {
    tid: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    rid: {
      //restaurantID
      type: NUMBER,
      foreignKey: true,
    },
    tablename: STRING,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// TablesModel.belongsTo(RestaurantsModel, {
//   foreignKey: 'rid',
// });

export { TablesModel };
