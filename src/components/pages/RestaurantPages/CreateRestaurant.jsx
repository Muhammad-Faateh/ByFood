import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { Grid, Snackbar } from "@mui/material";
import AddRestaurant from "../../controls/AddRestaurant";
import OwnerNavBar from "../../controls/OwnerNavBar";
import OneMenuItemAdd from "../../controls/OneMenuitemAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiAlert from "@mui/material/Alert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles({
  ContentSection: {
    display: "flex",
    justifyContent: "center",
    margin: "3rem 0px",
    maxHeight: "25rem",
  },
});

const CreateRestaurant = () => {
  const steps = ["Create Restaurant", "Create Menu"];
  const classes = useStyle();
  const history = useHistory();

  //                                 STATES

  const [activeStep, setActiveStep] = React.useState(0);
  const [restaurantinfo, setRestaurantInfo] = React.useState({
    restaurantName: "",
    address: "",
    restaurantType: "",
  });
  const [restaurantService, setRestaurantService] = React.useState({
    dineIn: false,
    takeAway: false,
  });

  const [isError, setError] = React.useState({
    nameError: false,
    addressError: false,
    typesError: false,
    serviceError: false,
  });
  const [isALert, setAlert] = React.useState({
    openAlert: false,
    AlertSeverityError: false,
    AlertMessage: "",
  });
  const [menuItems, setItems] = React.useState({
    foodName: "",
    description: "",
    category: "",
    price: 0,
  });
  const [menuError, setMenuError] = React.useState({
    nameError: false,
    descriptionError: false,
    priceError: false,
    categoryError: false,
  });

  const HandleChange = (event) =>
    setItems({ ...menuItems, [event.target.name]: event.target.value });

  const HandleFirstChange = (event) => {
    setRestaurantInfo({
      ...restaurantinfo,
      [event.target.name]: event.target.value,
    });
  };
  const HandleCheckChange = (event) => {
    setRestaurantService({
      ...restaurantService,
      [event.target.name]: event.target.checked,
    });
  };
  const HandleCloseAlert = () => {
    setAlert({ ...isALert, openAlert: false });
  };
  const MenuSubmit = () => {
    if (
      menuItems.foodName === "" ||
      menuItems.description === "" ||
      menuItems.category === ""
    ) {
      setMenuError({
        nameError: true,
        descriptionError: true,
        categoryError: true,
      });
      setAlert({
        openAlert: true,
        AlertSeverityError: true,
        AlertMessage: "Please fill in the form",
      });
      return false;
    } else if (menuItems.price <= 0) {
      setMenuError({
        nameError: false,
        descriptionError: false,
        categoryError: false,
        priceError: true,
      });
      return false;
    } else {
      setMenuError({ ...isError, priceError: false });
      return true;
    }
  };
  const OnSubmit = () => {
    if (
      restaurantinfo.restaurantName === "" ||
      restaurantinfo.restaurantType === "" ||
      restaurantinfo.address === ""
    ) {
      setError({ ...isError, [isError]: true, serviceError: false });
      setAlert({
        openAlert: true,
        AlertSeverityError: true,
        AlertMessage: "Please fill in the form",
      });
      return false;
    } else if (!restaurantService.dineIn && !restaurantService.takeAway) {
      setError({ ...isError, [isError]: false, serviceError: true });
      return false;
    } else {
      return true;
    }
  };

  const FinishSubmit = () => {
    // history.push("/myrestaurant");
    console.log(restaurantinfo);
    console.log(restaurantService);
    console.log(menuItems);
  };

  const HandleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const HandleNext = () => {
    switch (activeStep) {
      case 0:
        if (OnSubmit()) {
          setError({ ...isError, [isError]: false, serviceError: false });
          setActiveStep(activeStep + 1);
        }
        break;
      case 1:
        if (MenuSubmit()) {
          setMenuError({ ...isError, priceError: false });
          setActiveStep(activeStep + 1);
        }
        break;

      default:
        break;
    }
  };

  const ShowContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AddRestaurant
            restaurantinfo={restaurantinfo}
            Errors={isError}
            firstChange={HandleFirstChange}
            secondChange={HandleCheckChange}
            restaurantService={restaurantService}
          />
        );
      case 1:
        return (
          <div>
            <OneMenuItemAdd
              menuItems={menuItems}
              Errors={menuError}
              onChange={HandleChange}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Are you sure you want to continue?</h1>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div>
      <OwnerNavBar />
      <div style={{ padding: "5rem", marginTop: "1rem" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className={classes.ContentSection}>{ShowContent()}</div>

        <div className={classes.ButtonSection}>
          <Grid container>
            <Grid item xs={4}>
              {activeStep >= 1 && (
                <Button
                  variant="contained"
                  onClick={HandleBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              )}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <div style={{ float: "right" }}>
                {activeStep < steps.length ? (
                  <Button
                    variant="contained"
                    onClick={HandleNext}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </Button>
                ) : (
                  <Button variant="contained" onClick={FinishSubmit}>
                    Finish
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          open={isALert.openAlert}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={HandleCloseAlert}
        >
          <Alert
            onClose={HandleCloseAlert}
            severity={isALert.AlertSeverityError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {isALert.AlertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default CreateRestaurant;
