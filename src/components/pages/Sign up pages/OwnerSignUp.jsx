import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import BreadCrumb from "../../controls/BreadCrumb";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import MuiAlert from "@mui/material/Alert";
import validator from "validator";
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
    width: "35rem",
    margin: "0.5rem",
  },
  SubmitSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
  },
});
//                              COMPONENT START

const OwnerSignUp = () => {
  const classes = useStyle();
  const history = useHistory();
  let active = {
    color: "white",
    backgroundColor: "#E0475B",
    padding: "10px",
    borderRadius: "25px",
  };
  //                             STATES

  const [showPassword, setShowPassword] = React.useState(true);
  const [showPassword2, setShowPassword2] = React.useState(true);
  const [owners, setOwners] = React.useState([]);
  const [isAlert, setAlert] = React.useState({
    openAlert: false,
    error: false,
    message: "",
  });
  const [userInfo, setInfo] = React.useState({
    name: "",
    email: "",
    gender: "male",
    password: "",
    reEnter_password: "",
  });
  const [isError, setError] = React.useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    rePasswordError: false,
  });

  //                             USEEFFECT
  useEffect(() => {
    OwnersService.getOwners("owners").then((response) => {
      setOwners(response.data);
    });
  }, []);

  //                             METHODS

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const CloseAlert = () => setAlert({ ...isAlert, openAlert: false });

  const HandleChange = (event) =>
    setInfo({ ...userInfo, [event.target.name]: event.target.value });

  //                             SUBMIT HANDLING

  const HandleSubmit = () => {
    if (
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.reEnter_password === ""
    ) {
      setAlert({
        error: true,
        openAlert: true,
        message: "Please fill in the form",
      });
    } else if (userInfo.name.length <= 3) {
      setError({ ...isError, nameError: true });
    } else if (!validator.isEmail(userInfo.email)) {
      setError({ ...isError, emailError: true });
    } else if (userInfo.password !== userInfo.reEnter_password) {
      setAlert({
        openAlert: true,
        error: true,
        message: "Passwords do not match",
      });
    } else {
      if (owners.length == 0) {
        setInfo({
          name: "",
          password: "",
          reEnter_password: "",
          gender: "male",
          email: "",
        });
        OwnersService.registerOwner("signup", userInfo).catch((error) =>
          console.log(error)
        );
        OwnersService.getOwners("owners").then((response) => {
          setOwners(response.data);
        });
        setAlert({ error: false, openAlert: true });
        setError({ ...isError, nameError: false, emailError: false });
      } else {
        if (owners.map((owner) => owner.email).includes(userInfo.email)) {
          setAlert({
            openAlert: true,
            error: true,
            message: "This user already exist",
          });
        } else {
          setInfo({
            name: "",
            password: "",
            reEnter_password: "",
            gender: "male",
            email: "",
          });
          OwnersService.registerOwner("signup", userInfo).catch((error) =>
            console.log(error)
          );
          OwnersService.getOwners("owners").then((response) => {
            setOwners(response.data);
          });
          setAlert({ error: false, openAlert: true });
          setError({ ...isError, nameError: false, emailError: false });
        }
      }
    }
  };

  //                                   RETURN START

  return (
    <div>
      <BreadCrumb ownerActive={active} />
      <div className={classes.PaperWrapper}>
        <Paper elevation={3} className={classes.Paper}>
          <Button
            style={{ color: "#E0475B", margin: "10px 0px 0px 10px" }}
            onClick={() => history.push("/")}
          >
            <ArrowBackIcon />
            Home
          </Button>
          <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Owner Sign Up
          </h1>
          {/*                    FORM                           */}

          <Grid container>
            <Grid item md={6} xs={12}>
              <TextField
                style={{ width: "100%", padding: "15px 15px" }}
                label="Enter your name"
                error={isError.nameError}
                helperText={
                  isError.nameError ? "Name not entered properly" : ""
                }
                name="name"
                value={userInfo.name}
                onChange={HandleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl
                component="fieldset"
                style={{ width: "100%", padding: "0px 15px" }}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  row
                  value={userInfo.gender}
                  onChange={HandleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio style={{ color: "#E0475B" }} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio style={{ color: "#E0475B" }} />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

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
            <Grid item md={6} xs={12}>
              <TextField
                style={{ width: "100%", padding: "15px 15px" }}
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
            <Grid item md={6} xs={12}>
              <TextField
                style={{ width: "100%", padding: "15px 15px" }}
                type={showPassword2 ? "text" : "password"}
                error={isError.rePasswordError}
                helperText={
                  isError.rePasswordError ? "Password not entered properly" : ""
                }
                label="Re-enter your password"
                name="reEnter_password"
                value={userInfo.reEnter_password}
                onChange={HandleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword2}>
                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
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
              Submit
            </Button>
            <Typography
              style={{
                fontSize: "15px",
                fontFamily: "'Lora', serif",
                marginTop: "0.5rem",
              }}
            >
              Have an account? <Link to="/ownerlogin">Login</Link>
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

export default OwnerSignUp;
