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

const ViewMenuItem = () => {
  const classes = useStyle();
  const { menuId, ownerId } = useParams();
  const [menuItem, setItem] = React.useState();
  const history = useHistory();

  useEffect(() => {
    OwnersService.getOwner(`owners/${ownerId}`).then((response) => {
      const item = response.data.restaurant.menu.filter(
        (item) => item._id === menuId
      );
      setItem(item);
    });
  }, []);

  return (
    <div>
      {!menuItem ? (
        <Loading />
      ) : (
        <div className={classes.PaperWrapper}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => history.push("/menuapproval")}
            >
              <KeyboardBackspaceIcon fontSize="inherit" />
            </IconButton>

            <h1 style={{ textAlign: "center", margin: "2rem 0px" }}>
              Menu Item
            </h1>
            <Grid container style={{ marginBottom: "1.3rem" }}>
              <Grid item xs={6}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={menuItem[0].image}
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
                    {menuItem[0].foodName}
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
                    {menuItem[0].description}
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
                    {menuItem[0].category}
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
                    {menuItem[0].price}
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default ViewMenuItem;
