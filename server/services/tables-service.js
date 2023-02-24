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

  async getTable(tid) {
    try {
      return TablesModel.findOne({ where: { tid } });
    } catch (error) {
      console.log(error);
    }
  }

  async getFreeTablesInRestaurantByDatetime(rid, timestart, timeend) {
    try {
      if (!rid) throw new Error(`Please input time restaurant`);
      if (!timestart) throw new Error(`Please input time start`);
      if (!timeend) throw new Error(`Please input time end`);

      const tables = await this.getAllTablesByRestaurantFromDB(rid);

      if (tables instanceof Error) throw new Error(tables.error);

      return busyTablesService.getFreeTables(JSON.stringify(tables), timestart, timeend);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getBusyTablesInRestaurantByDatetime(rid, timestart, timeend) {
    try {
      if (!rid) throw new Error(`Please input time restaurant`);
      if (!timestart) throw new Error(`Please input time start`);
      if (!timeend) throw new Error(`Please input time end`);

      const tables = await this.getAllTablesByRestaurantFromDB(rid);

      if (tables instanceof Error) throw new Error(tables.error);

      return busyTablesService.getBusyTables(JSON.stringify(tables), timestart, timeend);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async setTableSettingsToDB(newSettings) {
    try {
      const { tid } = newSettings;
      const tableToChange = await this.getTable(tid);

      if (tableToChange instanceof Error) throw new Error(tableToChange.message);

      const result = TablesModel.update({ ...newSettings }, { where: { tid } });

      if (result instanceof Error) throw new Error(result.message);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteTable(tid) {
    try {
      const tableToDelete = await this.getTable(tid);

      if (tableToDelete instanceof Error) throw new Error(tableToDelete.message);

      return await TablesModel.destroy({ where: { tid } });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export const tablesService = new TablesService();
