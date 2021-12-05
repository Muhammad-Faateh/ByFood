import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
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

const AllRestaurants = () => {
  const classes = useStyle();
  const history = useHistory();
  const [restaurants, setRestaurants] = React.useState([]);

  useEffect(() => {
    const getOwner = async () => {
      const LoggedInOwner = await OwnersService.GetLoggedInUser();
      if (!(OwnersService.isLoggedIn() && LoggedInOwner.data.role == "Owner")) {
        history.push("/");
      } else {
        OwnersService.getOwners("owners")
          .then((response) => {
            const AllRestaurants = response.data
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
      <OwnerNavbar />
      <div style={{ height: "6rem" }} />
      <div style={{ margin: "1rem 1rem" }}>
        <Grid container spacing={3}>
          {restaurants.map((restaurant, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Card
                  sx={{ width: "100%" }}
                  onClick={() =>
                    history.push(`/allrestaurants/${restaurant._id}`)
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

export default AllRestaurants;
