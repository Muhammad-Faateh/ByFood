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

export default function GlobalBreadCrumb(props) {
  const { heading, link1, link2, url } = props;
  const classes = useStyle();
  return (
    <div className={classes.Body}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={url.url1} style={link1}>
          {heading.head1}
        </Link>
        <Link to={url.url2} style={link2}>
          {heading.head2}
        </Link>
      </Breadcrumbs>
    </div>
  );
}
