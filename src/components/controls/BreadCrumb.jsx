import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "5rem",
    marginTop: "2rem",
  },
  Link: {
    textDecoration: "none",
    color: "black",
  },
});

export default function BreadCrumb(props) {
  const classes = useStyle();
  return (
    <div className={classes.Body}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          to="/usersignup"
          className={classes.Link}
          style={props.userActive}
        >
          Sign Up as Customer
        </Link>
        <Link
          to="/ownersignup"
          className={classes.Link}
          style={props.ownerActive}
        >
          Sign Up as Restaurant Owner
        </Link>
      </Breadcrumbs>
    </div>
  );
}
