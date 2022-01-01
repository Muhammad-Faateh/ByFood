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
import UserService from "../../../services/UserService";

const useStyle = makeStyles({});

const UserProfile = () => {
  const classes = useStyle();
  const history = useHistory();
  const [user, setUser] = React.useState({});

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      history.push("/");
    } else {
      UserService.getUsers().then((response) => {
        const user = response.data.filter(
          (user) => user._id === UserService.GetLoggedInUser()._id
        );
        setUser(user[0]);
        console.log(user[0].notifications);
      });
    }
  }, []);

  return (
    <div>
      <UserNavBar />
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
                  {user.name}
                </p>
              </Grid>
              <Grid item xs={6} md={6}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Gender: </b>
                  {user.gender}
                </p>
              </Grid>
              <Grid item xs={12} md={12}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Email: </b>
                  {user.email}
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {user.notifications &&
                      user.notifications.map((notif, index) => {
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {notif.message}
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

export default UserProfile;
