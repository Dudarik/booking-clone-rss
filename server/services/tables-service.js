import { BusyTablesModel } from '../models/BusyTables.js';
import { TablesModel } from '../models/TablesModel.js';
import { busyTablesService } from './busyTables-service.js';

class TablesService {
  async addTableToDB(table) {
    try {
      const { rid, tablename } = table;

      if (!rid) throw new Error('Please select restaurant!');
      if (!tablename) throw new Error('Please input table name or number');

      const tableToAdd = await TablesModel.findOne({ where: [{ rid }, { tablename }] });

      if (tableToAdd) throw new Error(`Table with name "${tablename}" already exist in this restaurant.`);

      return await TablesModel.create({ rid, tablename });
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async bindTable(table) {
    try {
      return await busyTablesService.bindTable(table);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAllTablesByRestaurantFromDB(rid) {
    return await TablesModel.findAll({ where: { rid } });
  }
}

export const tablesService = new TablesService();
