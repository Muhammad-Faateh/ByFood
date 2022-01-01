import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import OwnerNavbar from "../../controls/OwnerNavBar";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import OwnersService from "../../../services/OwnerService";
import AdminService from "../../../services/Admin";
import SideNavigation from "../../controls/SideNavigation";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantService from "../../../services/RestaurantService";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import RestaurantDeleteDialog from "./RestaurantDeleteDialog";

const useStyle = makeStyles({
  Body: {
    display: "flex",
    justifyContent: "center",
    padding: "5px 5px",
  },
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

const AdminRestaurants = () => {
  const classes = useStyle();
  const history = useHistory();

  const [owners, setOwners] = React.useState([]);
  const [ownerID, setOwnerID] = React.useState("");
  const [ownerRole, setownerRole] = React.useState("");
  const [openDeleteDialog, setDeleteDialog] = React.useState(false);

  const HandleDeleteDialog = () => setDeleteDialog(false);
  const getOwner = async () => {
    if (!AdminService.IsLoggedIn()) {
      history.push("/");
    } else {
      OwnersService.getOwners("owners")
        .then((response) => {
          const AllOwners = response.data.filter(
            (owner) => owner.restaurantStatus !== false
          );
          setOwners(AllOwners);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  return (
    <div>
      {!owners ? (
        <div>loading...</div>
      ) : (
        <div style={{ position: "sticky" }}>
          <SideNavigation />
          <div className={classes.Body}>
            <Grid container spacing={1}>
              {owners.map((owner, index) => {
                return (
                  <Grid item xs={12} md={6} key={index}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={owner.restaurant.image}
                          alt="restaurant picture"
                        />
                        <CardContent className={classes.CardContent}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            style={{ fontFamily: "'Lora', serif" }}
                          >
                            {owner.restaurant.restaurantName}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            style={{ fontFamily: "'Lora', serif" }}
                          >
                            {owner.restaurant.restaurantType}
                          </Typography>
                          <ul className={classes.Services}>
                            <li>
                              <Typography
                                style={{ fontFamily: "'Lora', serif" }}
                              >
                                {owner.restaurant.dineIn ? (
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
                              <Typography
                                style={{ fontFamily: "'Lora', serif" }}
                              >
                                {owner.restaurant.takeAway ? (
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
                          <ul
                            className={classes.Services}
                            style={{ marginTop: "10px" }}
                          >
                            <li>
                              <IconButton
                                variant="contained"
                                style={{
                                  marginTop: "10px",
                                  backgroundColor: "#4169e1",
                                  color: "white",
                                }}
                                onClick={() =>
                                  history.push(
                                    `/adminallrestaurants/${owner._id}`
                                  )
                                }
                              >
                                <PreviewRoundedIcon fontSize="medium" />
                              </IconButton>
                            </li>
                            <li>
                              <IconButton
                                variant="contained"
                                style={{
                                  marginTop: "10px",
                                  backgroundColor: "rgb(224, 71, 91)",
                                  color: "white",
                                }}
                                onClick={() => {
                                  setDeleteDialog(true);
                                  setOwnerID(owner._id);
                                  setownerRole(owner.role);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </li>
                          </ul>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            <RestaurantDeleteDialog
              open={openDeleteDialog}
              HandleCloseDialog={HandleDeleteDialog}
              ownerID={ownerID}
              role={ownerRole}
              getOwners={getOwner}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurants;
