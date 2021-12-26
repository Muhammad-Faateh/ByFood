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
import RestaurantApprovalDialog from "./RestaurantApprovaldialog";
import RestaurantRejectDialog from "./RestaurantRejectDialog";

const useStyle = makeStyles({
  Body: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    flexDirection: "column",
  },
  List: {
    "& li": {
      display: "inline-block",
      margin: "0px 5px",
    },
  },
});

const REstaurantApproval = () => {
  const classes = useStyle();
  const [owners, setOwner] = React.useState([]);
  const [openDialog, setDialog] = React.useState(false);
  const [ownerID, setOwnerID] = React.useState("");
  const [role, setRole] = React.useState("");
  const [openRejectDialog, setRejectDialog] = React.useState(false);
  const history = useHistory();

  const HandleCloseDialog = () => {
    setDialog(false);
  };
  const HandleRejectDialog = () => {
    setRejectDialog(false);
  };

  const getOwners = () => {
    OwnersService.getOwners("owners").then((response) => {
      const owner = response.data
        .filter((owner) => owner.restaurant !== undefined)
        .filter((owner) => owner.restaurantStatus !== true);
      setOwner(owner);
    });
  };

  useEffect(() => {
    getOwners();
  }, []);

  return (
    <div>
      <SideNavigation />

      <Paper className={classes.Body} elevation={3}>
        <h1>
          Restaurant <span style={{ color: "#E0475B" }}>Approval</span>
        </h1>
        <TableContainer component={Paper} style={{ marginTop: "1.5rem" }}>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#E0475B" }}>
              <TableRow>
                <TableCell style={{ color: "white" }} align="center">
                  #
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Restaurant Name
                </TableCell>

                <TableCell style={{ color: "white" }} align="center">
                  RestaurantType
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Pictures
                </TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>

                <TableCell style={{ color: "white" }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {owners.map((owner, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {owner.restaurant.restaurantName}
                    </TableCell>
                    <TableCell align="center">
                      {owner.restaurant.restaurantType}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={owner.restaurant.image}
                        alt="item-image"
                        style={{
                          width: "50%",
                          maxHeight: "5rem",
                          imageRendering: "pixelated",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {owner.restaurantStatus ? "True" : "Pending"}
                    </TableCell>
                    {
                      <TableCell align="center">
                        <ul className={classes.List}>
                          <li>
                            <Button
                              id={owner.restaurant._id}
                              onClick={(event) => {
                                history.push(`/viewrestaurant/${owner._id}`);
                              }}
                              variant="outlined"
                            >
                              View
                            </Button>
                          </li>
                          <li>
                            <Button
                              id={owner.restaurant._id}
                              onClick={(event) => {
                                setDialog(true);
                                setOwnerID(owner._id);
                                setRole(owner.role);
                              }}
                              color="success"
                              variant="outlined"
                            >
                              Accept
                            </Button>
                          </li>
                          <li>
                            <Button
                              id={owner.restaurant._id}
                              onClick={(event) => {
                                setOwnerID(owner._id);
                                setRole(owner.role);
                                setRejectDialog(true);
                              }}
                              color="error"
                              variant="outlined"
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
        <RestaurantApprovalDialog
          open={openDialog}
          HandleCloseDialog={HandleCloseDialog}
          ownerID={ownerID}
          role={role}
          getOwners={getOwners}
        />
        <RestaurantRejectDialog
          HandleCloseDialog={HandleRejectDialog}
          open={openRejectDialog}
          getOwners={getOwners}
          ownerID={ownerID}
          role={role}
        />
      </Paper>
    </div>
  );
};

export default REstaurantApproval;
