import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button, Grid, Snackbar, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import UserService from "../../../services/UserService";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/system";
import MuiAlert from "@mui/material/Alert";
import OwnersService from "../../../services/OwnerService";
import Loading from "../../controls/Loading";

const Input = styled("input")({
  display: "none",
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OwnerCreatePost = (props) => {
  const { GetAllPosts } = props;
  const history = useHistory();
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    error: false,
    message: "",
  });
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [getUser, setUser] = React.useState({});
  const [getChar, setChar] = React.useState("");

  useEffect(() => {
    const getOwner = async () => {
      const LoggedInOwner = await OwnersService.GetLoggedInUser();
      if (
        !(OwnersService.isLoggedIn() && LoggedInOwner.data.role === "Owner")
      ) {
        history.push("/");
      } else {
        setUser(LoggedInOwner.data.restaurant);
        setChar(LoggedInOwner.data.restaurant.restaurantName);
        console.log(LoggedInOwner.data.restaurant);
      }
    };
    getOwner();
  }, []);
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandlePost = async () => {
    const post = {};
    post.title = getUser.restaurantName;
    post.body = body;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "byfood-fyp");
    data.append("cloud_name", "dojkqlq4u");
    const fetchData = await fetch(
      "https://api.cloudinary.com/v1_1/dojkqlq4u/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const jsonData = await fetchData.json();
    post.photo = jsonData.url;

    fetch("http://localhost:4000/api/createownerpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAlert({ openAlert: true, error: true, message: data.error });
        } else {
          setAlert({ ...isAlert, openAlert: true, error: false });
          setBody("");
          setImageName("");
          setImage("");
          GetAllPosts();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!getUser || !getChar ? (
        <Loading />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Paper elevation={3} style={{ width: "50rem", padding: "1rem" }}>
            <Grid container spacing={2}>
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
                <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
                  {getChar.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item xs={11} md={11}>
                <span style={{ fontSize: "1.5rem" }}>
                  {getUser.restaurantName}
                </span>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Enter your status..."
                  multiline
                  rows={4}
                  fullWidth
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                />
              </Grid>
              <Grid item md={10} xs={10}>
                <ul style={{ listStyleType: "none", display: "inline-block" }}>
                  <li style={{ display: "inline-block", marginRight: "3rem" }}>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={(event) => {
                          setImage(event.target.files[0]);
                          setImageName(event.target.files[0].name);
                        }}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<FileUploadIcon />}
                      >
                        Upload Image
                      </Button>
                    </label>
                  </li>
                  <li style={{ display: "inline-block" }}>
                    <p>{imageName}</p>
                  </li>
                </ul>
              </Grid>
              <Grid item md={2} xs={2}>
                <Button
                  variant="contained"
                  style={{ width: "100%", backgroundColor: "#E0475B" }}
                  onClick={HandlePost}
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Snackbar
            open={isAlert.openAlert}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            onClose={CloseAlert}
          >
            <Alert
              severity={isAlert.error ? "error" : "success"}
              onClose={CloseAlert}
            >
              {isAlert.error ? isAlert.message : "post is successfully created"}
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default OwnerCreatePost;
