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

const useStyle = makeStyles({});

const UserProfile = () => {
  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    // getRestaurant();
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
                  <b>Name: </b>Muhammad Faateh
                </p>
              </Grid>
              <Grid item xs={6} md={6}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Gender: </b>Muhammad Faateh
                </p>
              </Grid>
              <Grid item xs={12} md={12}>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  <b>Email: </b>Muhammad Faateh
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
                    <TableRow
                      key={0}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea quidem mollitia eveniet alias, facilis laborum unde,
                        est perspiciatis rem perferendis illo neque iste
                        laboriosam maiores iusto quis minima magni eligendi.
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={0}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea quidem mollitia eveniet alias, facilis laborum unde,
                        est perspiciatis rem perferendis illo neque iste
                        laboriosam maiores iusto quis minima magni eligendi.
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={0}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea quidem mollitia eveniet alias, facilis laborum unde,
                        est perspiciatis rem perferendis illo neque iste
                        laboriosam maiores iusto quis minima magni eligendi.
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={0}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea quidem mollitia eveniet alias, facilis laborum unde,
                        est perspiciatis rem perferendis illo neque iste
                        laboriosam maiores iusto quis minima magni eligendi.
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={0}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea quidem mollitia eveniet alias, facilis laborum unde,
                        est perspiciatis rem perferendis illo neque iste
                        laboriosam maiores iusto quis minima magni eligendi.
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={0}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea quidem mollitia eveniet alias, facilis laborum unde,
                        est perspiciatis rem perferendis illo neque iste
                        laboriosam maiores iusto quis minima magni eligendi.
                      </TableCell>
                    </TableRow>
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
