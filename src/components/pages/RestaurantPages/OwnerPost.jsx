import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import UserService from "../../../services/UserService";
import { useHistory } from "react-router";
import OwnerCreatePost from "./OwnerCreatePost";
import OwnerPostTemplate from "./OwnerPostTemplate";
import OwnersService from "../../../services/OwnerService";
import OwnerNavbar from "../../controls/OwnerNavBar";

const useStyle = makeStyles({
  HomeCard: {
    maxWidth: "350px",
    height: "max-content",
    margin: "26px auto",
  },
});

const OwnerPost = () => {
  const classes = useStyle();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [user, setUser] = React.useState("");
  const [restaurant, setRestaurant] = React.useState({});

  const GetAllPosts = (user) => {
    fetch("http://localhost:4000/api/allpost")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result);
      });
    setUser(user);
    setRestaurant(user.restaurant);
  };

  useEffect(() => {
    const getOwner = async () => {
      const LoggedInOwner = await OwnersService.GetLoggedInUser();
      if (
        !(OwnersService.isLoggedIn() && LoggedInOwner.data.role === "Owner")
      ) {
        history.push("/");
      } else {
        GetAllPosts(LoggedInOwner.data);
      }
    };
    getOwner();
  }, []);

  const MakeComment = (text, postID, title) => {
    fetch("http://localhost:4000/api/ownercomments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postID,
        text,
        title,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        GetAllPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deletePost = (postid) => {
  //   fetch(`http://localhost:4000/api//deletepost/${postid}`, {
  //     method: "delete",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const newData = data.filter((item) => {
  //         return item._id !== result._id;
  //       });
  //       setData(newData);
  //     });
  // };

  return (
    <div>
      <div>Posts hain</div>
      <OwnerNavbar />
      <div style={{ height: "5rem" }}></div>

      <OwnerCreatePost GetAllPosts={GetAllPosts} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <OwnerPostTemplate
          posts={data}
          user={user}
          restaurant={restaurant}
          MakeComment={MakeComment}
        />
      </div>
    </div>
  );
};

export default OwnerPost;
