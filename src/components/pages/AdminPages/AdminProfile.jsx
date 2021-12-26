import { Grid, Paper } from "@mui/material";
import React from "react";
import SideNavigation from "../../controls/SideNavigation";

const AdminProfile = () => {
  return (
    <div>
      <SideNavigation />
      <div
        style={{
          border: "1px solid black",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Paper
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid item xs={6} md={6}>
              <p>
                <b>Name: </b>Muhammad Faateh
              </p>
            </Grid>
            <Grid item xs={6} md={6}>
              <p>
                <b>Gender: </b>Muhammad Faateh
              </p>
            </Grid>
            <Grid item xs={12} md={12}>
              <p>
                <b>Email: </b>Muhammad Faateh
              </p>
            </Grid>
          </Grid>
        </Paper>
      </div>
      {/* <Paper elevation={3}>
          
        </Paper> */}
    </div>
  );
};

export default AdminProfile;
