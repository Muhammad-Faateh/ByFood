import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import MuiAlert from "@mui/material/Alert";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Snackbar,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import RestaurantService from "../../../services/RestaurantService";
import UserNavBar from "../../controls/UserNavBar";
import SendIcon from "@mui/icons-material/Send";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReviewDialog from "./ReviewDialog";
import ReviewService from "../../../services/ReviewService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `25px`,
      },
    },
    width: "100%",
  },
})(TextField);

const useStyle = makeStyles({
  OuterContainer: {
    padding: "0px 5rem",
    backgroundColor: "white",
  },
  Container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    "& h1": {
      margin: "10px 0px",
    },
    "& h2": {
      marginTop: "10px",
    },
    "& li": {
      display: "inline-block",
      margin: "0.5rem",
    },
  },
  ButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10rem",
  },
  paperWrapper: {},
  Paper: {
    padding: "10px 0px",
  },
});

const UserRestaurantView = () => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [restaurantInfo, setInfo] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [user, setUser] = React.useState({});
  const [userName, setUserName] = React.useState("");
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    error: false,
    message: "",
  });
  const [openDialog, setDialog] = React.useState(false);
  const [restaurantRate, setRestaurantRate] = React.useState(0);
  const [reviewID, setReviewID] = React.useState("");
  const [restaurantReviews, setReviews] = React.useState([]);
  const [editReview, setEditReview] = React.useState(false);
  const [editReviewID, setEditREviewID] = React.useState("");

  const getRestaurant = async () => {
    if (
      !UserService.isLoggedIn() &&
      UserService.GetLoggedInUser().role === "User"
    ) {
      history.push("/");
    } else {
      setUser(UserService.GetLoggedInUser());
      setUserName(UserService.GetLoggedInUser().name);
      RestaurantService.GetRestaurant(`restaurant/${id}`)
        .then((response) => {
          setInfo(response.data);
          setRestaurantRate(response.data.rating);
          setReviews(response.data.reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });
  const CloseDialog = () => setDialog(false);

  const HandleReview = (event) => {
    event.preventDefault();
    if (rating === 0 || message === "") {
      setAlert({
        openAlert: true,
        error: true,
        message: "Please fill the form",
      });
    } else if (message.length < 3) {
      setAlert({
        openAlert: true,
        error: true,
        message: "Feedback should be atleast 3 characters long",
      });
    } else if (editReview === true) {
      ReviewService.EditReview(editReviewID, {
        message,
        user,
        restaurantID: id,
        rating,
      })
        .then((response) => {
          setAlert({ ...isAlert, openAlert: true, error: false });
          setMessage("");
          setRating(0);
          getRestaurant();
          setEditReview(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      restaurantReviews
        .map((review) => review.user._id)
        .includes(UserService.GetLoggedInUser()._id)
    ) {
      setAlert({
        openAlert: true,
        error: true,
        message: "You already gave feedback",
      });
      setMessage("");
      setRating(0);
    } else {
      ReviewService.CreateReview({
        rating,
        message,
        user,
        restaurantID: id,
      })
        .then((response) => {
          setAlert({ ...isAlert, openAlert: true, error: false });
          setMessage("");
          setRating(0);
          getRestaurant();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <UserNavBar />
      {!restaurantInfo ? (
        <div>loading....</div>
      ) : (
        <div style={{ padding: " 0px 10rem" }}>
          <img
            src={restaurantInfo.image}
            alt="restaurant-image"
            style={{
              width: "100%",
              maxHeight: "25rem",
              imageRendering: "pixelated",
            }}
          />

          <div className={classes.OuterContainer}>
            <div className={classes.Container}>
              <h1>{restaurantInfo.restaurantName}</h1>
              <p>
                <b>Address : </b>
                {restaurantInfo.address}
              </p>
              <p>
                <b>Type :</b> {restaurantInfo.restaurantType}
              </p>
              <p style={{ margin: "10px 0px" }}>
                <b>Rating: </b>
                <Rating value={restaurantRate} readOnly />
              </p>
              <h2>Services</h2>
              <ul>
                <li>
                  {restaurantInfo.dineIn ? (
                    <DoneOutlinedIcon fontSize="small" color="success" />
                  ) : (
                    <CloseOutlinedIcon fontSize="small" color="error" />
                  )}{" "}
                  Dine-In
                </li>
                <li>
                  {restaurantInfo.takeAway ? (
                    <DoneOutlinedIcon fontSize="small" color="success" />
                  ) : (
                    <CloseOutlinedIcon fontSize="small" color="error" />
                  )}{" "}
                  Take-Away
                </li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: "5px" }}>
            <Paper elevation={3} style={{ padding: "10px 10px" }}>
              <div
                style={{
                  textAlign: "center",
                  margin: "10px 0px",
                }}
              >
                <Rating
                  name="rating"
                  size="large"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
              </div>

              <Grid container style={{ marginBottom: "1.5rem" }}>
                <Grid
                  item
                  xs={1}
                  md={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {userName.charAt(0)}
                  </Avatar>
                </Grid>
                <Grid item xs={10} md={10}>
                  <CustomTextField
                    label="Enter comment"
                    variant="outlined"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={1}
                  md={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={HandleReview}>
                    <SendIcon sx={{ color: "#E0475B" }} fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
              {!restaurantInfo.reviews ? (
                <div>loadingg...</div>
              ) : (
                restaurantInfo.reviews.map((review, index) => {
                  return (
                    <div key={index}>
                      <Grid container style={{ padding: "0.7rem " }}>
                        <Grid item xs={2} md={2}>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                          />
                        </Grid>
                        <Grid item xs={2} md={2}>
                          <p>
                            <b>{review.user.name}:</b>
                          </p>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <p>{review.message}</p>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          md={2}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {review.user._id ===
                            UserService.GetLoggedInUser()._id && (
                            <ul style={{ listStyleType: "none" }}>
                              <li style={{ display: "inline-block" }}>
                                <Button
                                  color="warning"
                                  onClick={() => {
                                    setMessage(review.message);
                                    setRating(review.rating);
                                    setEditReview(true);
                                    setEditREviewID(review._id);
                                  }}
                                >
                                  <EditIcon />
                                </Button>
                              </li>
                              <li style={{ display: "inline-block" }}>
                                <Button
                                  color="error"
                                  onClick={() => {
                                    setDialog(true);
                                    setReviewID(review._id);
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                              </li>
                            </ul>
                          )}
                        </Grid>
                        <Divider />
                      </Grid>
                      <Divider />
                    </div>
                  );
                })
              )}
            </Paper>
          </div>
        </div>
      )}

      {/*            ALERT MESSAGE              */}
      <Snackbar
        open={isAlert.openAlert}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={CloseAlert}
      >
        <Alert
          severity={isAlert.error ? "error" : "success"}
          onClose={CloseAlert}
        >
          {isAlert.error ? isAlert.message : "You have reviewed Successfully"}
        </Alert>
      </Snackbar>

      {/*         DIALOG BOX        */}
      <ReviewDialog
        open={openDialog}
        HandleCloseDialog={CloseDialog}
        restaurantID={id}
        reviewID={reviewID}
        GetRestaurant={getRestaurant}
      />
    </div>
  );
};

export default UserRestaurantView;
