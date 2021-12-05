import axios from "axios";
import jwt_decode from "jwt-decode";

class Restaurant {
  constructor() {}

  CreateRestaurantWithItem = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:4000/api/restaurant/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  UpdateRestaurant = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:4000/api/restaurant/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  GetRestaurant = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:4000/api/restaurant/${url}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}
const RestaurantService = new Restaurant();
export default RestaurantService;
