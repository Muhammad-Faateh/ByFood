import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import OwnerNavbar from "../../controls/OwnerNavBar";
import samplePicture from "../../../images/samplePicture.jpg";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import OwnersService from "../../../services/OwnerService";
import UserService from "../../../services/UserService";
import UserNavBar from "../../controls/UserNavBar";

const useStyle = makeStyles({
  CardContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Lora', serif",
  },
  Services: {
    listStyleType: "none",
    "& li": {
      display: "inline-block",
      margin: " 5px 2rem",
    },
  },
});

const UserRestaurants = () => {
  const classes = useStyle();
  const history = useHistory();
  const [restaurants, setRestaurants] = React.useState([]);

  useEffect(() => {
    const getOwner = async () => {
      if (
        !UserService.isLoggedIn() &&
        UserService.GetLoggedInUser().role === "Owner"
      ) {
        history.push("/");
      } else {
        OwnersService.getOwners("owners")
          .then((response) => {
            const AllRestaurants = response.data
              .filter((owner) => owner.restaurantStatus !== false)
              .map((owner) => owner.restaurant)
              .filter((restaurant) => restaurant !== undefined);
            setRestaurants(AllRestaurants);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getOwner();
  }, []);

  return (
    <div>
      <UserNavBar />
      <div style={{ height: "6rem" }} />
      <div style={{ margin: "1rem 1rem" }}>
        <Grid container spacing={3}>
          {restaurants
            .sort((a, b) => b.rating - a.rating)
            .map((restaurant, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Card
                    sx={{ width: "100%" }}
                    onClick={() =>
                      history.push(`/restaurants/${restaurant._id}`)
                    }
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={restaurant.image}
                        alt="restaurant picture"
                      />
                      <CardContent className={classes.CardContent}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {restaurant.restaurantName}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {restaurant.restaurantType}
                        </Typography>
                        <ul className={classes.Services}>
                          <li>
                            <Typography style={{ fontFamily: "'Lora', serif" }}>
                              {restaurant.dineIn ? (
                                <DoneOutlinedIcon
                                  fontSize="small"
                                  color="success"
                                />
                              ) : (
                                <CloseOutlinedIcon
                                  fontSize="small"
                                  color="error"
                                />
                              )}
                              Dine-In
                            </Typography>
                          </li>
                          <li>
                            <Typography style={{ fontFamily: "'Lora', serif" }}>
                              {restaurant.takeAway ? (
                                <DoneOutlinedIcon
                                  fontSize="small"
                                  color="success"
                                />
                              ) : (
                                <CloseOutlinedIcon
                                  fontSize="small"
                                  color="error"
                                />
                              )}
                              Take-Away
                            </Typography>
                          </li>
                        </ul>
                        <Rating
                          name="read-only"
                          value={restaurant.rating}
                          readOnly
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default UserRestaurants;
