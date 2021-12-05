import { makeStyles } from "@mui/styles";
import React from "react";
import HomeMenu from "../../controls/HomeMenu";
import { Button, Box, Grid, Card, Avatar, CardContent } from "@mui/material";
import Background from "../../../images/homeBackground.jpg";
import AboutImage from "../../../images/AboutPage.png";
import HomeFooter from "../../controls/HomeFooter";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  FirstSection: {
    marginTop: "4rem",
    position: "relative",
  },
  InnerSection: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "4px solid #E0475B",
    padding: "1rem",
    "& h1": {
      fontWeight: "700",
      "& span": {
        color: "#E0475B",
      },
    },
    "& p": {
      margin: "0.5rem 0px",
      fontSize: "1.5rem",
    },
    "& Button": {
      color: "white",
      backgroundColor: "#E0475B",
      "&:hover": {
        color: "#E0475B",
        backgroundColor: "transparent",
        border: "2px solid #E0475B",
      },
    },
  },
  RightSection: {
    "& div": {
      height: "100%",
      padding: "1rem",
      "& h1": {
        marginTop: "4rem",
        marginBottom: "2rem",
        fontSize: "3rem",
        textAlign: "center",
      },
      "& p": {
        fontSize: "1.2rem",
        marginTop: "1rem",
        padding: "1rem",
      },
    },
  },
  LeftSection: {
    "& div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
  },
  Card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    margin: "0px 3rem",
    "& Avatar": {
      marginTop: "1rem",
    },
    "& h1": {
      margin: "2.5rem 0px",
    },
    "& p": {
      textAlign: "center",
      margin: "1.5rem 0px",
    },
  },
});

const HomePage = () => {
  const classes = useStyle();
  const history = useHistory();
  const users = [
    {
      name: "M Faateh",
      designation: "FrontEnd Developer",
      letter: "M",
      color: "red",
      email: "mohammadfaateh@gmail.com",
    },
    {
      name: "Umer Habib",
      designation: "BackEnd Developer",
      letter: "U",
      color: "purple",
      email: "umerhabib@gmail.com",
    },
    {
      name: "Abdul Moeed",
      designation: "FrontEnd Developer",
      letter: "A",
      color: "red",
      email: "abdulmoeed@gmail.com",
    },
  ];
  const divIDS = {
    about: "About",
    mission: "Mission",
    contact: "ContactUs",
  };
  return (
    <div>
      <HomeMenu divIDS={divIDS} />
      <div className={classes.FirstSection}>
        <img
          src={Background}
          alt=""
          style={{ width: "100%", maxHeight: "35rem", filter: "blur(2px)" }}
        />
        <div className={classes.InnerSection}>
          <h1>
            Welcome to our By<span>FOOD</span>
          </h1>
          <p>
            <b>Place of Discounts</b>
          </p>
          <Button
            variant="contained"
            onClick={() => history.push("/usersignup")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div
        className="SecondSection"
        id={divIDS.about}
        style={{ marginTop: "1rem", backgroundColor: "white" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} style={{ height: "25rem" }}>
            <Grid item xs={12} md={6} className={classes.LeftSection}>
              <div>
                <img src={AboutImage} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.RightSection}>
              <div>
                <h1>About Us</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  voluptates itaque deserunt, quos odit reprehenderit numquam!
                  Animi, officiis nesciunt deleniti rerum reprehenderit sint
                  numquam fugit ipsa commodi facilis, totam culpa?
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div
        className="ThirdSection"
        id={divIDS.mission}
        style={{ marginTop: "1rem", backgroundColor: "white" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} style={{ height: "25rem" }}>
            <Grid item xs={12} md={6} className={classes.RightSection}>
              <div>
                <h1>Our Mission</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  voluptates itaque deserunt, quos odit reprehenderit numquam!
                  Animi, officiis nesciunt deleniti rerum reprehenderit sint
                  numquam fugit ipsa commodi facilis, totam culpa?
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.LeftSection}>
              <div>
                <img src={AboutImage} alt="" />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div
        className="FourthSection"
        id={divIDS.contact}
        style={{ marginTop: "1rem", margin: "0px , 10rem" }}
      >
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Contact Us</h1>
        <Grid
          container
          spacing={0}
          style={{ height: "25rem", margin: "1rem 0px" }}
        >
          {users.map((user, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Card className={classes.Card}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      marginTop: "1rem",
                      bgcolor: "red",
                    }}
                  >
                    {user.letter}
                  </Avatar>
                  <CardContent>
                    <h1>Hi! I'm {user.name}</h1>
                    <p>I'm a {user.designation}</p>
                    <p>
                      <b>Email: </b>
                    </p>
                    <p>{user.email}</p>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
