import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { Link, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../../images/ByFoodLogo.png";
import { useHistory } from "react-router";

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
    "&:hover": {
      color: "#E0475B",
    },
  },
  ButtonItems: {
    "& li": {
      display: "inline",
      marginRight: "1rem",
    },
  },
  Button: {
    backgroundColor: "#E0475B",
    color: "white",
    fontSize: "1.5rem",
  },
});

const HomeMenu = (props) => {
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
                <Link
                  href=""
                  underline="none"
                  color="black"
                  className={classes.Link}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`#${props.divIDS.about}`}
                  underline="none"
                  color="black"
                  className={classes.Link}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={`#${props.divIDS.mission}`}
                  underline="none"
                  color="black"
                  className={classes.Link}
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href={`#${props.divIDS.contact}`}
                  underline="none"
                  color="black"
                  className={classes.Link}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.ButtonItems}>
            <ul>
              <li>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#E0475B",
                    color: "white",
                    fontSize: "10px",
                  }}
                  onClick={() => history.push("/usersignup")}
                >
                  Sign Up
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#E0475B",
                    color: "white",
                    fontSize: "10px",
                  }}
                  onClick={() => history.push("/userlogin")}
                >
                  Log In
                </Button>
              </li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomeMenu;
