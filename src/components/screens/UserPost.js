import React, { useState, useEffect } from "react";
import UserNavBar from "../controls/UserNavBar";
import { makeStyles } from "@mui/styles";
import PostTemplate from "../controls/PostTemplate";
import UserService from "../../services/UserService";
import { useHistory } from "react-router";
import CreatePost from "./CreatePost";

const useStyle = makeStyles({
  HomeCard: {
    maxWidth: "350px",
    height: "max-content",
    margin: "26px auto",
  },
});

const UserPost = () => {
  const classes = useStyle();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [user, setUser] = React.useState("");

  const GetAllPosts = () => {
    fetch("http://localhost:4000/api/allpost")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
    setUser(UserService.GetLoggedInUser());
  };

  useEffect(() => {
    if (
      !(
        UserService.isLoggedIn() &&
        UserService.GetLoggedInUser().role === "User"
      )
    ) {
      history.push("/");
    } else {
      GetAllPosts();
    }
  }, []);

  const MakeComment = (text, postID, title) => {
    fetch("http://localhost:4000/api/comments", {
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

  const deletePost = (postid) => {
    fetch(`http://localhost:4000/api//deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div>
      <UserNavBar />
      <div style={{ height: "5rem" }}></div>

      <CreatePost GetAllPosts={GetAllPosts} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PostTemplate posts={data} user={user} MakeComment={MakeComment} />
      </div>

      {/* {data.map((item) => {
        return (
          <div className={classes.HomeCard} key={item._id}>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <h6>{item.title}</h6>
              <p>{item.body}</p>

              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  MakeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default UserPost;