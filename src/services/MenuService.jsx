import axios from "axios";

class MenuItem {
  constructor() {}

  CreateMenuItem = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:4000/api/menuitem/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  EditMenuItem = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:4000/api/menuitem/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  DeleteMenuItem = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:4000/api/menuitem/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  ApproveMenuItem = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch(
          `http://localhost:4000/api/menuitem/approvemenuitem/${url}`,
          data
        )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  RejectMenuItem = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .patch(`http://localhost:4000/api/menuitem/rejectmenuitem/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}
const MenuService = new MenuItem();
export default MenuService;
