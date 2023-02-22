import { tablesService } from '../services/tables-service.js';

class TablesController {
  async addTable(req, res) {
    try {
      const newTable = tablesService.addTableToDB(req.body);

      if (newTable instanceof Error) throw new Error(newTable.error);

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
      const tables = tablesService.getAllTablesByRestaurantFromDB(req.params.rid);

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
    } catch (error) {}
  }

  async getTablesByDatetime(req, res) {
    try {
    } catch (error) {}
  }
}

export const tablesController = new TablesController();
