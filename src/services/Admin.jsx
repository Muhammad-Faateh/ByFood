import axios from "axios";
import jwt_decode from "jwt-decode";

class Admin {
  constructor() {}
  getAdmins = () =>
    new Promise((resolve, reject) => {
      axios
        .get("http://localhost:4000/api/admin/admins")
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  AdminLogin = (data) =>
    new Promise((resolve, reject) => {
      axios
        .post("http://localhost:4000/api/admin/login", data)
        .then((response) => {
          localStorage.setItem("adminToken", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  AdminLogout = () => localStorage.removeItem("adminToken");
  IsLoggedIn = () => (localStorage.getItem("adminToken") ? true : false);

  GetLoggedInAdmin = () => {
    try {
      const token = localStorage.getItem("adminToken");
      const admin = jwt_decode(token);
      return admin;
    } catch (error) {
      return null;
    }
  };
  GetRestaurant = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:4000/api/admin/restaurant/${url}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
}
const AdminService = new Admin();
export default AdminService;
