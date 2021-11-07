import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../../images/ByFoodLogo.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  MenuItems: {
    "& li": {
      display: "inline",
      marginRight: "2rem",
    },
  },
  Link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "#E0475B",
    },
  },
  ButtonItems: {
    "& li": {
      display: "inline-block",
    },
    "& li:first-child": {
      marginRight: "1rem",
    },
  },
});

const OwnerNavbar = (props) => {
  const classes = useStyle();
  const history = useHistory();
  return (
    <div className="Body">
      <AppBar style={{ backgroundColor: "white" }}>
        <Toolbar className={classes.Toolbar}>
          <img src={Logo} alt="" style={{ width: "5rem", height: "3rem" }} />
          <div className={classes.MenuItems}>
            <ul>
              <li>
                <Link to="/myrestaurant" className={classes.Link}>
                  My Restaurant
                </Link>
              </li>
              <li>
                <Link to="/allrestaurants" className={classes.Link}>
                  All Restaurants
                </Link>
              </li>
              <li>
                <Link to="/posts" className={classes.Link}>
                  Posts
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.ButtonItems}>
            <ul>
              <li>
                <span>
                  <Typography style={{ color: "black", fontSize: "1rem" }}>
                    Welcome! Muhammad Faateh
                  </Typography>
                </span>
              </li>
              <li>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#E0475B",
                    color: "white",
                    fontSize: "10px",
                  }}
                  onClick={() => history.push("/")}
                >
                  Log Out
                </Button>
              </li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default OwnerNavbar;
