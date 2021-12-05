import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import MuiAlert from "@mui/material/Alert";
import validator from "validator";
import GlobalBreadCrumb from "../../controls/GlobalBreadCrumb";
import OwnersService from "../../../services/OwnerService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//                                  STYLING

const useStyle = makeStyles({
  PaperWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Paper: {
    width: "20rem",
    marginTop: "1rem",
  },
  SubmitSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 15px 15px 15px",
  },
});
//                              COMPONENT START

const OwnerLogIn = () => {
  const classes = useStyle();
  const history = useHistory();
  let active = {
    color: "white",
    backgroundColor: "#E0475B",
    padding: "10px",
    borderRadius: "25px",
    textDecoration: "none",
  };
  let notActive = {
    color: "black",
    textDecoration: "none",
  };
  let url = {
    url1: "/userlogin",
    url2: "/ownerlogin",
  };
  //                             STATES

  const [owners, setOwners] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(true);
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    error: false,
    message: "",
  });
  const [userInfo, setInfo] = React.useState({
    email: "",
    password: "",
  });
  const [isError, setError] = React.useState({
    emailError: false,
    passwordError: false,
  });

  //                             USEEFFECT

  useEffect(() => {
    OwnersService.getOwners("owners").then((response) => {
      setOwners(response.data);
    });
  }, []);

  //                             METHODS

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandleChange = (event) =>
    setInfo({ ...userInfo, [event.target.name]: event.target.value });

  //                             SUBMIT HANDLING

  const HandleSubmit = () => {
    if (!validator.isEmail(userInfo.email) || userInfo.password === "") {
      setAlert({
        error: true,
        openAlert: true,
        message: "Please fill in the form",
      });
    } else {
      if (!owners.map((owner) => owner.email).includes(userInfo.email)) {
        setAlert({
          error: true,
          openAlert: true,
          message: "This User is not Registered",
        });
      } else {
        OwnersService.loginOwner("login", userInfo)
          .then((response) => {
            setInfo({
              password: "",
              email: "",
            });
            setError({ emailError: false, passwordError: false });
            history.push("/myrestaurant");
          })
          .catch((error) => {
            setAlert({
              error: true,
              openAlert: true,
              message: "Password is incorrect",
            });
          });
      }
    }
  };

  //                                   RETURN START

  return (
    <div>
      <GlobalBreadCrumb
        link1={notActive}
        link2={active}
        url={url}
        heading={{ head1: "User LOG IN", head2: "Restaurant Owner LOG IN" }}
      />
      <div className={classes.PaperWrapper}>
        <Paper elevation={3} className={classes.Paper}>
          <Button
            style={{ color: "#E0475B", margin: "10px 0px 0px 10px" }}
            onClick={() => history.push("/")}
          >
            <ArrowBackIcon />
            Home
          </Button>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              padding: "5px 0px",
            }}
          >
            Owner LOG IN
          </h1>
          {/*                    FORM                           */}

          <Grid container>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%", padding: "15px 15px" }}
                label="Enter your email"
                error={isError.emailError}
                helperText={
                  isError.emailError ? "Email not entered properly" : ""
                }
                type="email"
                name="email"
                value={userInfo.email}
                onChange={HandleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%", padding: "15px 15px 5px 15px" }}
                error={isError.passwordError}
                type={showPassword ? "text" : "password"}
                helperText={
                  isError.passwordError ? "Password not entered properly" : ""
                }
                label="Enter your password"
                name="password"
                value={userInfo.password}
                onChange={HandleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              paddingRight: "15px",
            }}
          >
            <Link to="/ownerforgotpassword">Forgot Password?</Link>
          </div>

          <div className={classes.SubmitSection}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: "#E0475B" }}
              onClick={HandleSubmit}
            >
              LOGIN
            </Button>
            <Typography
              style={{
                fontSize: "15px",
                fontFamily: "'Lora', serif",
                marginTop: "0.5rem",
              }}
            >
              Dont have an account? <Link to="/ownersignup">Sign Up</Link>
            </Typography>
          </div>
        </Paper>

        {/*                         ALERT MESSAGE                      */}

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
            {isAlert.error ? isAlert.message : "You are sucessfully registered"}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default OwnerLogIn;
