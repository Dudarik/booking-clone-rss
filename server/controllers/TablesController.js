import { busyTablesService } from '../services/busyTables-service.js';
import { tablesService } from '../services/tables-service.js';

class TablesController {
  async addTable(req, res) {
    try {
      const newTable = await tablesService.addTableToDB(req.body);

      if (newTable instanceof Error) throw new Error(newTable.message);

      res.json({
        status: 200,
        data: newTable,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async getAllTables(req, res) {
    try {
    } catch (error) {}
  }

  async getTablesFromRestaraunt(req, res) {
    try {
      // console.log(req.query);
      // tablestatus === free | busy | all
      const { tablestatus, timestart, timeend } = req.query;

      // const tables = tablesService.getAllTablesByRestaurantFromDB(req.params.rid);

      let tables;

      switch (tablestatus) {
        case 'free':
          tables = await tablesService.getFreeTablesInRestaurantByDatetime(req.params.rid, timestart, timeend);
          break;

        case 'busy':
          console.log('busy');
          tables = await tablesService.getBusyTablesInRestaurantByDatetime(req.params.rid, timestart, timeend);
          break;

        case 'all':

        default:
          break;
      }

      if (tables instanceof Error) throw new Error(tables.message);

      res.json({
        status: 200,
        data: tables,
      });
    } catch (error) {
      console.log(error.message);
      req.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async bindTable(req, res) {
    try {
      const bindedTable = await busyTablesService.bindTable(req.body);

      if (bindedTable instanceof Error) throw new Error(bindedTable.message);
      return res.json({
        status: 200,
        data: bindedTable,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async getTablesByDatetime(req, res) {
    try {
    } catch (error) {}
  }
}

export const tablesController = new TablesController();
