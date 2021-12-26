import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../../images/ByFoodLogo.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import OwnersService from "../../services/OwnerService";
import UserService from "../../services/UserService";

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

const UserNavBar = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [owner, setOwner] = React.useState([]);

  useEffect(() => {
    const getOwner = async () => {
      if (
        !(
          UserService.isLoggedIn() &&
          UserService.GetLoggedInUser().role === "User"
        )
      ) {
        history.push("/");
      } else {
        setOwner(UserService.GetLoggedInUser().name);
      }
    };
    getOwner();
  }, []);

  return (
    <div className="Body">
      <AppBar style={{ backgroundColor: "white" }}>
        <Toolbar className={classes.Toolbar}>
          <img src={Logo} alt="" style={{ width: "5rem", height: "3rem" }} />
          <div className={classes.MenuItems}>
            <ul>
              <li>
                <Link to="/restaurants" className={classes.Link}>
                  All Restaurants
                </Link>
              </li>
              <li>
                <Link to="/userpost" className={classes.Link}>
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/userprofile" className={classes.Link}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.ButtonItems}>
            <ul>
              <li>
                <span>
                  <Typography style={{ color: "black", fontSize: "1rem" }}>
                    Welcome! {owner}
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
                  onClick={() => {
                    UserService.UserLogOut();
                    history.push("/");
                  }}
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

export default UserNavBar;
