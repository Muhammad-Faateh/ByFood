import { Grid, IconButton, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OwnersService from "../../../services/OwnerService";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Loading from "../../controls/Loading";

const useStyle = makeStyles({
  PaperWrapper: {
    padding: "4rem",
  },
});

const ViewRestaurant = () => {
  const classes = useStyle();
  const { id } = useParams();
  const [owner, setOwner] = React.useState();
  const history = useHistory();

  useEffect(() => {
    OwnersService.getOwner(`owners/${id}`).then((response) => {
      console.log(response.data.restaurant);
      setOwner(response.data.restaurant);
    });
  }, []);

  return (
    <div>
      {!owner ? (
        <Loading />
      ) : (
        <div className={classes.PaperWrapper}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => history.push("/restaurantapprovals")}
            >
              <KeyboardBackspaceIcon fontSize="inherit" />
            </IconButton>

            <h1 style={{ textAlign: "center", margin: "2rem 0px" }}>
              Restaurant
            </h1>
            <Grid container style={{ padding: "1rem " }}>
              <Grid item xs={6}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={owner.image}
                  alt="image"
                />
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Restaurant Name: </b>
                    {owner.restaurantName}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Restaurant Address: </b>
                    {owner.address}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Restaurant Type: </b>
                    {owner.restaurantType}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <h3
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    Services
                  </h3>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ul style={{ listStyleType: "none" }}>
                    <li
                      style={{ display: "inline-block", marginRight: "2rem" }}
                    >
                      {owner.dineIn ? (
                        <DoneOutlinedIcon fontSize="small" color="success" />
                      ) : (
                        <CloseOutlinedIcon fontSize="small" color="error" />
                      )}{" "}
                      <span style={{ fontSize: "1.2rem" }}>Dine-In</span>
                    </li>
                    <li style={{ display: "inline-block" }}>
                      {owner.takeAway ? (
                        <DoneOutlinedIcon fontSize="small" color="success" />
                      ) : (
                        <CloseOutlinedIcon fontSize="small" color="error" />
                      )}{" "}
                      <span style={{ fontSize: "1.2rem" }}>Take-Away</span>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
            {/* <h1 style={{ textAlign: "center", margin: "2rem 0px" }}>
              Menu Item
            </h1>
            <Grid container>
              <Grid item xs={6}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={owner.menu[0].image}
                  alt="image"
                />
              </Grid>
              <Grid item xs={6} style={{ paddingTop: "5rem" }}>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Food Name: </b>
                    {owner.menu[0].foodName}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Description: </b>
                    {owner.menu[0].description}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Category: </b>
                    {owner.menu[0].category}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      margin: "1rem",
                    }}
                  >
                    <b>Food Price: </b>
                    {owner.menu[0].price}
                  </p>
                </Grid>
              </Grid>
            </Grid> */}
          </Paper>
        </div>
      )}
    </div>
  );
};

export default ViewRestaurant;
