import { BusyTablesModel } from '../models/BusyTables.js';
import { json, Op } from 'sequelize';

class BusyTablesService {
  async isBusyTable(tid, timestart, timeend) {
    const q = {
      where: { tid, timestart: { [Op.lte]: timeend }, timeend: { [Op.gte]: timestart } },
    };
    // console.log('q', q);
    const tableToBind = await BusyTablesModel.findOne(q);

    // console.log(tableToBind);
    if (tableToBind) return true;

    return false;
  }

  async bindTable(table) {
    try {
      const { uid, rid, tid, tablename, timestart, timeend } = table;

      if (!uid) throw new Error(`User not selected`);
      if (!rid) throw new Error(`Can't find restaurant with id: ${rid}`);
      if (!tid) throw new Error(`Please select table to bind`);
      if (!timestart) throw new Error(`Please select time start`);
      if (!timeend) throw new Error(`Please select table to bind`);

      // console.log('isBusy', isBusy);
      if (await this.isBusyTable(tid, timestart, timeend))
        throw new Error(`Can't bind table, coz he is already binded: "${tid}:${tablename}"`);

      const tableBinded = await BusyTablesModel.create({ ...table });

      if (tableBinded instanceof Error) throw new Error(tableBinded.message);

      return tableBinded;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async getBusyTablesByDatetime(timestart, timeend) {
    try {
      if (!timestart) throw new Error(`Please input time start`);
      if (!timeend) throw new Error(`Please input time end`);

      return BusyTablesModel.findAll({ where: { timestart: { [Op.between]: [timestart, timeend] } } });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getFreeTables(tables, timestart, timeend) {
    try {
      tables = JSON.parse(tables);
      // if (Array.isArray(tables)) throw new Error(`Tables must be an array`);
      if (!timestart) throw new Error(`Please input time start`);
      if (!timeend) throw new Error(`Please input time end`);

      const targetTabelsIds = tables.map((table) => table.tid);

      const busyTables = await BusyTablesModel.findAll({
        where: {
          tid: { [Op.or]: targetTabelsIds },
          timestart: { [Op.lte]: timeend },
          timeend: { [Op.gte]: timestart },
        },
      });

      const busyTablesIds = busyTables.map((table) => table.tid);

      // console.log(tables);

      return tables.filter((table) => !busyTablesIds.includes(table.tid));
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async getBusyTables(tables, timestart, timeend) {
    try {
      tables = JSON.parse(tables);
      // if (Array.isArray(tables)) throw new Error(`Tables must be an array`);
      if (!timestart) throw new Error(`Please input time start`);
      if (!timeend) throw new Error(`Please input time end`);

      const targetTabelsIds = tables.map((table) => table.tid);

      const busyTables = await BusyTablesModel.findAll({
        where: {
          tid: { [Op.or]: targetTabelsIds },
          timestart: { [Op.lte]: timeend },
          timeend: { [Op.gte]: timestart },
        },
      });

      const busyTablesIds = busyTables.map((table) => table.tid);

      return tables.filter((table) => busyTablesIds.includes(table.tid));
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
  // async getFreeTablesInRestaurantByDatetime(rid, timestart, timeend)
}

export const busyTablesService = new BusyTablesService();
