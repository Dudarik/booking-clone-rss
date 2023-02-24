import { sequelize } from '../db_settings/index.js';
import { BusyTablesModel } from '../models/BusyTables.js';
import { CommentsModel } from '../models/CommentsModel.js';
import { RestaurantsModel } from '../models/RestaurantsModel.js';
import { TablesModel } from '../models/TablesModel.js';

class RestaurantService {
  async addRestaurantToDB(restaurant) {
    try {
      const { title, address } = restaurant;

      await sequelize.authenticate();

      if (!title) throw new Error(`Please input title!`);
      if (!address) throw new Error(`Please input address!`);

      const restaurantToAdd = await RestaurantsModel.findOne({
        where: [{ title }, { address }],
      });

      if (restaurantToAdd) {
        throw new Error(`Restaurant ${title} on address: ${address} allready exist`);
      }

      return await RestaurantsModel.create({ title, address });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getActiveRestaurantsFromDB(ridArray) {
    let queryParams = { attributes: ['rid', 'title', 'address'], where: { isactive: true } };

    if (ridArray.length !== 0) {
      Object.assign(queryParams.where, { rid: ridArray });
    }

    // console.log('qparams', queryParams);
    return await RestaurantsModel.findAll(queryParams);
  }

  async getRestaurant(rid) {
    try {
      return RestaurantsModel.findOne({ where: { rid } });
    } catch (error) {
      console.log(error);
    }
  }

  async setRestaurantSettingsToDB(newSettings) {
    try {
      const { rid } = newSettings;
      const restaurantToChange = await this.getRestaurant(rid);

      if (restaurantToChange instanceof Error) throw new Error(restaurantToChange.message);

      const result = RestaurantsModel.update({ ...newSettings }, { where: { rid } });

      if (result instanceof Error) throw new Error(result.message);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteRestaurant(rid) {
    try {
      const restaurantToDelete = await this.getRestaurant(rid);

      if (restaurantToDelete instanceof Error) throw new Error(restaurantToDelete.message);

      return await RestaurantsModel.destroy({ where: { rid } });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export const restaurantService = new RestaurantService();
