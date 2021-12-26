import React, { useEffect } from "react";
import SideNavigation from "../../controls/SideNavigation";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import AdminService from "../../../services/Admin";

const useStyle = makeStyles({
  Body: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const AdminDashBoard = () => {
  const classes = useStyle();
  const history = useHistory();
  const [admin, setAdmin] = React.useState({});
  const [nameChar, setChar] = React.useState("");

  // React.useEffect(() => {
  //   if (!AdminService.IsLoggedIn()) {
  //     history.push("/");
  //   }
  // }, []);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      history.push("/");
    } else {
      const admin = AdminService.GetLoggedInAdmin();
      setAdmin(admin.admin);
      setChar(admin.admin.name);
    }
  }, []);
  return (
    <div>
      <SideNavigation />
      <Paper className={classes.Body} elevation={3}>
        <p style={{ fontSize: "19px" }}>
          <b>Welcome to your panel</b> {nameChar}!
        </p>
      </Paper>
    </div>
  );
};

export default AdminDashBoard;
