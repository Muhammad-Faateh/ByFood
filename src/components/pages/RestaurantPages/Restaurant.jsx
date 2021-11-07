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

const Restaurant = () => {
  const classes = useStyle();
  const history = useHistory();
  const params = useParams();
  const restaurantDATA = {
    restaurantID: 101,
    restaurantName: params.name,
    Address: "0000 , liberty market , Lahore",
    type: "Fast Food",
    DineIn: true,
    TakeAway: true,
    // picture : '',
    MenuItems: [
      {
        menuId: 1,
        name: "Karahi",
        category: "Desi",
        price: 500,
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit repellendus, necessitatibus fuga, excepturi molestias ad aperiam illum incidunt accusamus pariatur quaerat. Earum nihil porro culpa deserunt suscipit alias facilis voluptatum.",
        picture: "picture comes here",
      },
      {
        menuId: 2,
        name: "Chicken Boti",
        category: "BBQ",
        price: 1000,
        description: "It tastes lovely",
        picture: "picture comes here",
      },
      {
        menuId: 19,
        name: "Fish",
        category: "SeaFood",
        price: 750,
        description: "It tastes lovely",
        picture: "picture comes here",
      },
      {
        menuId: 13,
        name: "Lasagnia",
        category: "desi",
        price: 650,
        description: "It tastes lovely",
        picture: "picture comes here",
      },
      {
        menuId: 13,
        name: "Chicken kebab",
        category: "desi",
        price: 650,
        description: "It tastes lovely",
        picture: "picture comes here",
      },
    ],
  };

  const [restaurantInfo, setInfo] = React.useState(restaurantDATA);
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <OwnerNavbar />
      <img
        src={SamplePicture}
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
            {restaurantInfo.Address}
          </p>
          <p>
            <b>Type :</b> {restaurantInfo.type}
          </p>
          <h2>Services</h2>
          <ul>
            <li>
              {restaurantInfo.DineIn ? (
                <DoneOutlinedIcon fontSize="small" color="success" />
              ) : (
                <CloseOutlinedIcon fontSize="small" color="error" />
              )}{" "}
              Dine-In
            </li>
            <li>
              {restaurantInfo.TakeAway ? (
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

          <div>
            <MenuTable
              searchItem={search}
              MenuData={restaurantInfo.MenuItems}
              Action={false}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Restaurant;
