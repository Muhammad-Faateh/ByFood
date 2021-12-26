import React from "react";
import SideNavigation from "../../controls/SideNavigation";
import Divider from "@mui/material/Divider";
import {
  Avatar,
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
  return (
    <div>
      <SideNavigation />
      <div className={classes.Body}>
        <Card style={{ width: "40rem", marginBottom: "3rem" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
                {/* {post.title.charAt(0)} */}
              </Avatar>
            }
            //   title={post.title}
            //   subheader={FormatDate(post.createdAt)}
          />
          <CardMedia
            component="img"
            height="250"
            //   image={post.photo}
            alt="photo"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {/* <b>Status :</b> {post.body} */}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>

          {/* <CardContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  MakeComment(
                    event.target[0].value,
                    post._id,
                    restaurant.restaurantName
                  );
                  event.target[0].value = "";
                }}
              >
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={1}
                    md={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {restaurant.restaurantName.charAt(0)}
                    </Avatar>
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <CustomTextField label="Enter comment" variant="outlined" />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    md={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton type="submit">
                      <SendIcon sx={{ color: "#E0475B" }} fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent> */}

          {/* {post.comments.map((comment, index1) => {
          return (
            <CardContent key={index1}>
              <Divider />
              <ul
                style={{
                  listStyleType: "none",
                  marginTop: "5px",
                }}
              >
                <li style={{ display: "inline-block", marginRight: "5px" }}>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {comment.title.charAt(0)}
                  </Avatar>
                </li>
                <li style={{ display: "inline-block", marginRight: "5px" }}>
                  <b>{comment.title}: </b>
                </li>
                <li style={{ display: "inline-block" }}>{comment.text}</li>
              </ul>
            </CardContent>
          );
        })} */}
        </Card>
      </div>
    </div>
  );
};

export default AdminPost;
