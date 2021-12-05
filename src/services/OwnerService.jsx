import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = "http://localhost:4000/api/owner/";
// axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class OwnerService {
  constructor() {}

  getOwners = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

  getOwner = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  registerOwner = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  forgotPassword = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch(url, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  loginOwner = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => {
          resolve(response);
          localStorage.setItem("token", response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  OwnerLogOut = () => localStorage.removeItem("token");

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  GetLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      const owner = await this.getOwner(`owners/${user._id}`);
      return owner;
    } catch (error) {
      return null;
    }
  };
}
const OwnersService = new OwnerService();
export default OwnersService;
