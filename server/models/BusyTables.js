import { sequelize } from '../db_settings/index.js';
import { NUMBER, TIME } from 'sequelize';
import { RestaurantsModel } from './RestaurantsModel.js';

const BusyTablesModel = sequelize.define(
  'busytables',
  {
    id: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    tid: {
      //tableID
      type: NUMBER,
      foreignKey: true,
    },
    rid: {
      //restaurantID
      type: NUMBER,
      foreignKey: true,
    },
    uid: {
      //userID
      type: NUMBER,
      foreignKey: true,
    },
    timestart: TIME,
    timeend: TIME,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// BusyTablesModel.belongsTo(RestaurantsModel, {
//   foreignKey: 'rid',
// });

export { BusyTablesModel };
