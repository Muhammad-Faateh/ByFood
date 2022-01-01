import React, { useEffect } from "react";
import SideNavigation from "../../controls/SideNavigation";
import Divider from "@mui/material/Divider";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  Body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem  0px",
  },
});
const AdminPost = () => {
  const classes = useStyle();
  const [posts, setPosts] = React.useState([]);
  const reversePost = [...posts];
  const anotherposts = reversePost.reverse();

  const FormatDate = (createdAt) => {
    var mydate = Date.parse(createdAt);
    var date = new Date(mydate);
    var result = date.toString("dddd MMMM yyyy");
    if (result) {
      if (result !== "Invalid Date") {
        return result.slice(0, 15);
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/allpost")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // setData(result);
        setPosts(result);
      });
  });
  return (
    <div>
      <SideNavigation />
      <div className={classes.Body}>
        {anotherposts
          .filter((post) => post.status === "Pending")
          .map((post, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <ul style={{ listStyleType: "none" }}>
                    <li
                      style={{ display: "inline-block", marginRight: "2.5rem" }}
                    >
                      <Button variant="contained" color="success">
                        Accept
                      </Button>
                    </li>
                    <li style={{ display: "inline-block" }}>
                      <Button variant="contained" color="error">
                        Reject
                      </Button>
                    </li>
                  </ul>
                </div>
                <Card style={{ width: "40rem", marginBottom: "3rem" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ backgroundColor: "red" }}
                        aria-label="recipe"
                      >
                        {post.title.charAt(0)}
                      </Avatar>
                    }
                    title={post.title}
                    subheader={FormatDate(post.createdAt)}
                  />
                  <CardMedia
                    component="img"
                    height="250"
                    image={post.photo}
                    alt="photo"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <b>Status :</b> {post.body}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminPost;
