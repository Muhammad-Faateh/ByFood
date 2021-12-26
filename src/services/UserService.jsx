import axios from "axios";
import jwt_decode from "jwt-decode";

class User {
  constructor() {}

  UserLogOut = () => localStorage.removeItem("token");

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  GetLoggedInUser = () => {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      return user;
    } catch (error) {
      return null;
    }
  };
  getUsers = () =>
    new Promise((resolve, reject) => {
      axios
        .get("http://localhost:4000/users")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

  forgotPassword = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch(`http://localhost:4000/forgotpassword/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}
const UserService = new User();
export default UserService;
