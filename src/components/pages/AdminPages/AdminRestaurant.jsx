import React, { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SideNavigation from "../../controls/SideNavigation";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import RestaurantService from "../../../services/RestaurantService";
import AdminService from "../../../services/Admin";
import AdminMenuTable from "./AdminMenuTable";

const useStyle = makeStyles({
  Body: {
    // height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
});

const AdminRestaurant = () => {
  const { id } = useParams();
  const classes = useStyle();
  const history = useHistory();
  const [restaurantInfo, setInfo] = React.useState({});
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    AdminService.GetRestaurant(id).then((response) => {
      setInfo(response.data);
    });
  }, []);
  return (
    <div>
      <SideNavigation />
      <Paper className={classes.Body} elevation={3}>
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

        <TextField
          variant="outlined"
          name="search"
          type="search"
          label="Search by name..."
          style={{ width: "30rem" }}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/*        Menu Table           */}

        {restaurantInfo.menu ? (
          <div
            style={{
              width: "100%",
              //   border: "1px solid black",
              padding: "5px",
            }}
          >
            <AdminMenuTable
              searchItem={search}
              MenuData={restaurantInfo.menu.filter(
                (item) => item.status === "Approved"
              )}
            />
          </div>
        ) : (
          <div>loading.....</div>
        )}
      </Paper>
    </div>
  );
};

export default AdminRestaurant;
