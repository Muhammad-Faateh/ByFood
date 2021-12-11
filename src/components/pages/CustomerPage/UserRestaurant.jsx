import React, { useEffect } from "react";
import OwnerNavbar from "../../controls/OwnerNavBar";
import SamplePicture from "../../../images/samplePicture.jpg";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Grid, Paper, TextField } from "@mui/material";
import MenuTable from "../../controls/MenuTable";
import { useParams } from "react-router-dom";
import OwnersService from "../../../services/OwnerService";
import RestaurantService from "../../../services/RestaurantService";
import AnotherMenuTable from "../../controls/AnotherMenuTable";
import UserNavBar from "../../controls/UserNavBar";

const useStyle = makeStyles({
  OuterContainer: {
    padding: "0px 5rem",
    backgroundColor: "white",
  },
  Container: {
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

const UserRestaurant = () => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [restaurantInfo, setInfo] = React.useState({});
  const [search, setSearch] = React.useState("");

  const getRestaurant = async () => {
    const LoggedInOwner = await OwnersService.GetLoggedInUser();
    RestaurantService.GetRestaurant(`restaurant/${id}`)
      .then((response) => {
        setInfo(response.data);
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
      <UserNavBar />
      <img
        src={restaurantInfo.image}
        alt="restaurant-image"
        style={{
          width: "100%",
          maxHeight: "20rem",
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
      <div className={classes.paperWrapper}>
        <Paper elevation={3} className={classes.Paper}>
          <Grid container>
            <Grid item md={4} />
            <Grid item md={4}>
              <TextField
                variant="outlined"
                name="search"
                type="search"
                label="Search by name..."
                style={{ width: "100%" }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Grid>
            <Grid item md={4} />
          </Grid>

          {/*        Menu Table           */}

          {restaurantInfo.menu ? (
            <div>
              <AnotherMenuTable
                searchItem={search}
                MenuData={restaurantInfo.menu}
              />
            </div>
          ) : (
            <div>loading.....</div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default UserRestaurant;
