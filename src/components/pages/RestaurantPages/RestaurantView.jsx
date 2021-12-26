import React, { useEffect } from "react";
import OwnerNavbar from "../../controls/OwnerNavBar";
import SamplePicture from "../../../images/samplePicture.jpg";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Divider, Grid, Paper, Rating, TextField } from "@mui/material";
import MenuTable from "../../controls/MenuTable";
import { useParams } from "react-router-dom";
import OwnersService from "../../../services/OwnerService";
import RestaurantService from "../../../services/RestaurantService";
import AnotherMenuTable from "../../controls/AnotherMenuTable";

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

const RestaurantView = () => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [restaurantInfo, setInfo] = React.useState({});
  const [restaurantRating, setRating] = React.useState(0);

  const getRestaurant = async () => {
    RestaurantService.GetRestaurant(`restaurant/${id}`)
      .then((response) => {
        setInfo(response.data);
        setRating(response.data.rating);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <div>
      <OwnerNavbar />
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
              <Rating name="read-only" value={restaurantRating} readOnly />
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
            {!restaurantInfo.reviews ? (
              <div>loading...</div>
            ) : (
              restaurantInfo.reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <Grid container style={{ padding: "5px 0px" }}>
                      <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={3} md={3}>
                        <p>
                          <b>{review.user.name} :</b>
                        </p>
                      </Grid>
                      <Grid item xs={7} md={7}>
                        <p>{review.message}</p>
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
    </div>
  );
};

export default RestaurantView;
