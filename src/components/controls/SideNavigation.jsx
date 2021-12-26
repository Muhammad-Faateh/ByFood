import * as React from "react";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Button, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import AdminService from "../../services/Admin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyle = makeStyles({
  Menu: {
    height: "100vh",
    float: "left",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    marginRight: "10px",
  },
  Header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  MiddleMenu: {
    display: "flex",
    justifyContent: "center",
    "& ul": {
      listStyleType: "none",
      textAlign: "center",
      padding: "10px",
      "& li": {
        textDecoration: "none",
        margin: "20px 0px 20px 0px",
        fontSize: "17px",
        // "& Link": {
        //   textDecoration: "none",
        //   color: "black",
        // },
      },
    },
  },
  Link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#E0475B",
    },
  },
});

const SideNavigation = () => {
  const classes = useStyle();
  const history = useHistory();
  const [admin, setAdmin] = React.useState({});
  const [nameChar, setChar] = React.useState("");

  React.useEffect(() => {
    if (!AdminService.IsLoggedIn()) {
      history.push("/");
    } else {
      const admin = AdminService.GetLoggedInAdmin();
      setAdmin(admin.admin);
      setChar(admin.admin.name);
    }
  }, []);
  return (
    <div>
      <Paper className={classes.Menu}>
        <div className={classes.Header}>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 56,
              height: 56,
              marginBottom: "1rem",
            }}
          >
            {nameChar.charAt(0)}
          </Avatar>
          <h2>Welcome!</h2>
          <h2>{admin.name}</h2>
          <br />
        </div>
        <Divider />
        <div className={classes.MiddleMenu}>
          <ul>
            {/* <li>
              <Link to="/adminprofile" className={classes.Link}>
                Profile
              </Link>
            </li> */}
            <li>
              <Link to="/adminallrestaurants" className={classes.Link}>
                All Restaurants
              </Link>
            </li>
            <li>
              <Link to="/adminposts" className={classes.Link}>
                All Posts
              </Link>
            </li>
            <li>
              <Link to="/restaurantapprovals" className={classes.Link}>
                Restaurant Approvals
              </Link>
            </li>
            <li>
              <Link to="/menuapproval" className={classes.Link}>
                MenuItems Approval
              </Link>
            </li>
          </ul>
        </div>
        <Divider />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#E0475B",
            display: "flex",
            marginTop: "10px",
          }}
          onClick={() => {
            AdminService.AdminLogout();
            history.push("/");
          }}
        >
          LogOut
        </Button>
        <h1
          style={{
            textAlign: "center",
            margin: "2rem 0px 2rem 0px",
            fontSize: "2.5rem",
          }}
        >
          By<span style={{ color: "#E0475B" }}>Food</span>{" "}
        </h1>
      </Paper>
    </div>
  );
};
export default SideNavigation;
