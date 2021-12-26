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
import { useHistory } from "react-router";
import MuiAlert from "@mui/material/Alert";
import validator from "validator";
import AdminService from "../../../services/Admin";
import { lightGreen } from "@mui/material/colors";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//                                  STYLING

const useStyle = makeStyles({
  PaperWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  Paper: {
    width: "20rem",
    marginTop: "2rem",
    padding: "5px",
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

const AdminSignIn = () => {
  const classes = useStyle();
  const history = useHistory();

  //                             STATES

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
  const [admins, setAdmin] = React.useState([]);
  //                             USEEFFECT

  useEffect(() => {
    AdminService.getAdmins().then((response) => {
      setAdmin(response.data);
    });
  }, []);

  //                             METHODS

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandleChange = (event) =>
    setInfo({ ...userInfo, [event.target.name]: event.target.value });

  //                             SUBMIT HANDLING

  const HandleSubmit = () => {
    if (userInfo.email === "" || userInfo.password === "") {
      setAlert({
        error: true,
        openAlert: true,
        message: "Please fill in the form",
      });
    } else if (!validator.isEmail(userInfo.email)) {
      setError({ ...isError, emailError: true });
    } else if (userInfo.password === "") {
      setError({ ...isError, passwordError: true });
    } else if (!admins.map((admin) => admin.email).includes(userInfo.email)) {
      setAlert({
        error: true,
        openAlert: true,
        message: "Admin does not exist",
      });
    } else {
      AdminService.AdminLogin(userInfo)
        .then((response) => {
          history.push("/admindashboard");
        })
        .catch((error) => {
          setAlert({
            error: true,
            openAlert: true,
            message: error,
          });
        });
    }
  };

  //                                   RETURN START

  return (
    <div>
      <div className={classes.PaperWrapper}>
        <Paper elevation={3} className={classes.Paper}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              padding: "5px 0px",
            }}
          >
            Admin
          </h1>
          {/*                    FORM                           */}

          <Grid container spacing={2}>
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

          <div className={classes.SubmitSection}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: "#E0475B" }}
              onClick={HandleSubmit}
            >
              LOGIN
            </Button>
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

export default AdminSignIn;
