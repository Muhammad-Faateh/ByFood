import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import OwnerNavbar from "../../controls/OwnerNavBar";
import samplePicture from "../../../images/samplePicture.jpg";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

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
  const restaurants = [
    {
      name: "Bundu Khan",
      type: "Pan Asian",
      dine: true,
      takeaway: true,
    },
    {
      name: "Pan Masala",
      type: "Pan Asian",
      dine: true,
      takeaway: true,
    },
    {
      name: "Howdy",
      type: "Pan Asian",
      dine: true,
      takeaway: true,
    },
    {
      name: "Arcadian Cafe",
      type: "Pan Asian",
      dine: true,
      takeaway: true,
    },
    {
      name: "Bistro Cafe",
      type: "Pan Asian",
      dine: true,
      takeaway: true,
    },
    {
      name: "The Skyee",
      type: "Pan Asian",
      dine: true,
      takeaway: true,
    },
  ];
  return (
    <div>
      <OwnerNavbar />
      <div style={{ height: "6rem" }} />
      <div style={{ margin: "1rem 1rem" }}>
        <Grid container spacing={3}>
          {restaurants.map((restaurant, index) => {
            return (
              <Grid item xs={4}>
                <Card
                  sx={{ width: "100%" }}
                  onClick={() =>
                    history.push(`/allrestaurants/${restaurant.name}`)
                  }
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={samplePicture}
                      alt="restaurant picture"
                    />
                    <CardContent className={classes.CardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {restaurant.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {restaurant.type}
                      </Typography>
                      <ul className={classes.Services}>
                        <li>
                          <Typography style={{ fontFamily: "'Lora', serif" }}>
                            {restaurant.dine ? (
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
                            {restaurant.takeaway ? (
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
