import React, { useEffect } from "react";
import { useHistory } from "react-router";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserNavBar from "../../controls/UserNavBar";
import { makeStyles } from "@mui/styles";
import OwnerNavbar from "../../controls/OwnerNavBar";
import OwnersService from "../../../services/OwnerService";

const useStyle = makeStyles({});

const OwnerProfile = () => {
  const classes = useStyle();
  const history = useHistory();
  const [owner, setOwner] = React.useState({});
  const [notifications, setNotifications] = React.useState([]);
  const anotherNotifications = [...notifications];
  const reversedNotifs = anotherNotifications.reverse();

  useEffect(() => {
    const getOwner = async () => {
      const LoggedInOwner = await OwnersService.GetLoggedInUser();
      if (
        !(OwnersService.isLoggedIn() && LoggedInOwner.data.role === "Owner")
      ) {
        history.push("/");
      } else {
        setOwner(LoggedInOwner.data);
        setNotifications(LoggedInOwner.data.notifications);
      }
    };
    getOwner();
  }, []);

  return (
    <div>
      <OwnerNavbar />
      <div style={{ margin: "5rem  0px" }}>
        <div
          style={{
            margin: "0px 10rem",
          }}
        >
          <Paper elevation={3} style={{ padding: "1.5rem" }}>
            <Grid container spacing={3} style={{ marginTop: "1rem" }}>
              <Grid item xs={6} md={6}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Name: </b>
                  {owner.name}
                </p>
              </Grid>
              <Grid item xs={6} md={6}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Gender: </b>
                  {owner.gender}
                </p>
              </Grid>
              <Grid item xs={12} md={12}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Email: </b>
                  {owner.email}
                </p>
              </Grid>
            </Grid>
            <h1
              style={{
                textAlign: "center",
                marginTop: "3rem",
                color: "#E0475B",
              }}
            >
              Notifications
              <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {reversedNotifs.map((notification, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            style={{ fontSize: "15px" }}
                          >
                            {notification.message}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </h1>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
