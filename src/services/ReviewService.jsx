import axios from "axios";
import jwt_decode from "jwt-decode";

class Review {
  constructor() {}

  CreateReview = (data) =>
    new Promise((resolve, reject) => {
      axios
        .post("http://localhost:4000/api/review/createreview", data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  DeleteReview = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:4000/api/review/deletereview/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });

  EditReview = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:4000/api/review/editreview/${url}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}
const ReviewService = new Review();
export default ReviewService;
