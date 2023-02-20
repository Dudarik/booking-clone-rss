import { sequelize } from '../db_settings/index.js';
import { NUMBER, TIME } from 'sequelize';
import { RestaurantsModel } from './RestaurantsModel.js';

const BusyTablesModel = sequelize.define(
  'tables',
  {
    id: {
      type: NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    tableid: {
      type: NUMBER,
      foreignKey: true,
    },
    restaurantid: {
      type: NUMBER,
      foreignKey: true,
    },
    userid: {
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

BusyTablesModel.belongsTo(RestaurantsModel, {
  foreignKey: 'rid',
});

export { BusyTablesModel };
