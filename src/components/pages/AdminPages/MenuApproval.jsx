import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import SideNavigation from "../../controls/SideNavigation";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import RestaurantService from "../../../services/RestaurantService";
import OwnersService from "../../../services/OwnerService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PreviewIcon from "@mui/icons-material/Preview";
import MenuService from "../../../services/MenuService";

const useStyle = makeStyles({
  Body: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  List: {
    "& li": {
      display: "inline-block",
      margin: "0px 5px",
    },
  },
});

const MenuApproval = () => {
  const classes = useStyle();
  const [owners, setOwner] = React.useState([]);
  const history = useHistory();

  const getOwners = () => {
    OwnersService.getOwners("owners").then((response) => {
      const owner = response.data
        .filter((owner) => owner.restaurant !== undefined)
        .filter((owner) => owner.restaurantStatus === true);

      const owners = owner.filter((owner) =>
        owner.restaurant.menu.filter((item) => item.status === "Pending")
      );

      // const final_Array = owner
      console.log(owners);
      // console.log(final_Array);
      setOwner(owner);
    });
  };

  useEffect(() => {
    getOwners();
  }, []);

  return (
    <div>
      {!owners ? (
        <div className={classes.Body}>loading...</div>
      ) : (
        <div>
          <SideNavigation />
          <Paper className={classes.Body} elevation={3}>
            <h1>
              Menu Item <span style={{ color: "#E0475B" }}>Approval</span>
            </h1>

            {owners.map((owner, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    padding: "20px",
                  }}
                >
                  <p style={{ marginTop: "1rem", textAlign: "center" }}>
                    <b>Restaurant Name: </b>
                    {owner.restaurant.restaurantName}
                  </p>
                  <TableContainer
                    component={Paper}
                    style={{ marginTop: "1.5rem" }}
                  >
                    <Table size="small">
                      <TableHead style={{ backgroundColor: "#E0475B" }}>
                        <TableRow>
                          <TableCell style={{ color: "white" }} align="center">
                            #
                          </TableCell>

                          <TableCell style={{ color: "white" }} align="center">
                            Menu Item Name
                          </TableCell>
                          <TableCell style={{ color: "white" }} align="center">
                            Category
                          </TableCell>
                          <TableCell style={{ color: "white" }} align="center">
                            Pictures
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            Status
                          </TableCell>

                          <TableCell style={{ color: "white" }} align="center">
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {owner.restaurant.menu
                          .filter((item) => item.status === "Pending")
                          .map((item, indextwo) => {
                            return (
                              <TableRow
                                key={indextwo}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  {indextwo + 1}
                                </TableCell>

                                <TableCell align="center">
                                  {item.foodName}
                                </TableCell>
                                <TableCell align="center">
                                  {item.category}
                                </TableCell>
                                <TableCell align="center">
                                  <img
                                    src={item.image}
                                    alt="item-image"
                                    style={{
                                      width: "50%",
                                      maxHeight: "5rem",
                                      imageRendering: "pixelated",
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{item.status}</TableCell>
                                {
                                  <TableCell align="center">
                                    <ul className={classes.List}>
                                      <li>
                                        <Button
                                          // id={owner.restaurant._id}
                                          onClick={(event) => {
                                            history.push(
                                              `/viewmenuitem/${owner._id}/${item._id}`
                                            );
                                          }}
                                          variant="outlined"
                                        >
                                          View
                                        </Button>
                                      </li>
                                      <li>
                                        <Button
                                          onClick={(event) => {
                                            MenuService.ApproveMenuItem(
                                              item._id,
                                              { ownerID: owner._id }
                                            ).then((response) => {
                                              getOwners();
                                            });
                                          }}
                                          variant="outlined"
                                          color="success"
                                        >
                                          Accept
                                        </Button>
                                      </li>
                                      <li>
                                        <Button
                                          onClick={(event) => {
                                            MenuService.RejectMenuItem(
                                              item._id,
                                              { ownerID: owner._id }
                                            ).then((response) => {
                                              getOwners();
                                            });
                                          }}
                                          variant="outlined"
                                          color="error"
                                        >
                                          Reject
                                        </Button>
                                      </li>
                                    </ul>
                                  </TableCell>
                                }
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              );
            })}
          </Paper>
        </div>
      )}
    </div>
  );
};

export default MenuApproval;
