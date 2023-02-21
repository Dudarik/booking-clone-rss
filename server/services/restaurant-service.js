import { sequelize } from '../db_settings/index.js';
import { RestaurantsModel } from '../models/RestaurantsModel.js';

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
    let queryParams = { attributes: ['rid', 'title', 'address'], where: { isActive: true } };

    if (ridArray.length !== 0) {
      Object.assign(queryParams.where, { rid: ridArray });
    }

    console.log('qparams', queryParams);
    return await RestaurantsModel.findAll(queryParams);
  }
}

export const restaurantService = new RestaurantService();
