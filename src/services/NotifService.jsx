import axios from "axios";
import jwt_decode from "jwt-decode";

class Notif {
  constructor() {}

  CreateNotif = (data) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `http://localhost:4000/api/notifications/createnotification`,
          data
        )
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}
const NotifService = new Notif();
export default NotifService;
