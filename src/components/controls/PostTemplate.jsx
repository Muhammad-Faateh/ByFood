import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `25px`,
      },
    },
    width: "100%",
  },
})(TextField);

const PostTemplate = (props) => {
  const { posts, user, MakeComment } = props;
  const [showButton, setButton] = React.useState(false);
  const reversepost = [...posts];
  const anotherPost = reversepost.reverse();

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

  return (
    <div>
      {anotherPost.map((post, index) => {
        return (
          <Card style={{ width: "40rem", marginBottom: "3rem" }} key={index}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>

            <CardContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  MakeComment(event.target[0].value, post._id, user.name);
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
                      {user.name.charAt(0)}
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
            </CardContent>

            {post.comments.map((comment, index1) => {
              return (
                <CardContent key={index1}>
                  <Divider />
                  <ul
                    style={{
                      listStyleType: "none",
                      //   border: "1px solid black",
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
            })}
          </Card>
        );
      })}
    </div>
  );
};
export default PostTemplate;
