import { restaurantService } from '../services/restaurant-service.js';

class RestaurantController {
  async addRestaurant(req, res) {
    try {
      const newRestaurant = await restaurantService.addRestaurantToDB(req.body);

      if (newRestaurant instanceof Error) throw new Error(newRestaurant.message);

      res.json({
        status: 200,
        data: newRestaurant,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async getRestaurants(req, res) {
    try {
      const restaurants = await restaurantService.getActiveRestaurantsFromDB([]);
      return res.json({
        status: 200,
        data: restaurants,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }

  async getRestaurant(req, res) {
    try {
      const rid = req.params.id;
      const restaurant = await restaurantService.getActiveRestaurantsFromDB([rid]);

      if (!restaurant) throw new Error(`Can't find restaurant with id ${rid} indatabase`);

      res.json({
        status: 200,
        data: restaurant[0],
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 422,
        error: error.message,
      });
    }
  }
}

export const restaurantController = new RestaurantController();
