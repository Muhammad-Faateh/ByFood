import React, { useEffect } from "react";
import OwnerNavbar from "../../controls/OwnerNavBar";
import SamplePicture from "../../../images/samplePicture.jpg";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, Grid, Paper, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import MenuTable from "../../controls/MenuTable";
import OwnersService from "../../../services/OwnerService";
import AnotherMenuTable from "../../controls/AnotherMenuTable";
const useStyle = makeStyles({
  OuterContainer: {
    display: "flex",
    justifyContent: "space-around",
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

const RestaurantHomePage = () => {
  const classes = useStyle();
  const history = useHistory();

  const [restaurantInfo, setInfo] = React.useState({});
  const [search, setSearch] = React.useState("");

  //                            USSEEFECT

  useEffect(() => {
    const getOwner = async () => {
      const LoggedInOwner = await OwnersService.GetLoggedInUser();
      if (!(OwnersService.isLoggedIn && LoggedInOwner.data.role === "Owner")) {
        history.push("/");
      } else if (LoggedInOwner.data.restaurant === undefined) {
        history.push("/createrestaurant");
      } else {
        setInfo(LoggedInOwner.data.restaurant);
        // console.log(LoggedInOwner.data.restaurant);
      }
    };
    getOwner();
  }, []);

  return (
    <div>
      <OwnerNavbar />
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
        <div className={classes.ButtonContainer}>
          <Button
            color="warning"
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            onClick={() => history.push("/editrestaurant")}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className={classes.paperWrapper}>
        <Paper elevation={3} className={classes.Paper}>
          <Grid container>
            <Grid item md={3} />
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
            <Grid item md={2} />
            <Grid item md={3}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => history.push("/addmenuitem")}
                  startIcon={<AddIcon />}
                >
                  Add Item
                </Button>
              </div>
            </Grid>
          </Grid>

          {/*        Menu Table           */}

          {restaurantInfo.menu ? (
            <div>
              <MenuTable
                searchItem={search}
                MenuData={restaurantInfo.menu}
                Action={true}
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

export default RestaurantHomePage;
