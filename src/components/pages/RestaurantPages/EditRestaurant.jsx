import React from "react";
import RestaurantForm from "../../controls/RestaurantForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditRestaurant = () => {
  const [restaurantData, setRestaurant] = React.useState({
    name: "",
    address: "",
    types: "",
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

  const HandleFirstChange = (event) => {
    setRestaurant({
      ...restaurantData,
      [event.target.name]: event.target.value,
    });
  };
  const HandleCheckChange = (event) => {
    setRestaurantService({
      ...restaurantService,
      [event.target.name]: event.target.checked,
    });
  };
  const HandleCloseAlert = () => setAlert({ openAlert: false });

  const OnSubmit = () => {
    if (
      restaurantData.name === "" ||
      restaurantData.address === "" ||
      restaurantData === ""
    ) {
      setError({
        nameError: true,
        addressError: true,
        typesError: true,
        serviceError: false,
      });
      setAlert({
        openAlert: true,
        AlertSeverityError: true,
        AlertMessage: "Please fill in the form",
      });
    } else if (!restaurantService.dineIn && !restaurantService.takeAway) {
      setError({
        nameError: false,
        addressError: false,
        typesError: false,
        serviceError: true,
      });
    } else {
      setRestaurant({
        name: "",
        address: "",
        types: "",
      });
      setRestaurantService({
        dineIn: false,
        takeAway: false,
      });
      setError({
        nameError: false,
        addressError: false,
        typesError: false,
        serviceError: false,
      });
      setAlert({
        openAlert: true,
        AlertSeverityError: false,
        AlertMessage: "Restaurant is successfully edited",
      });
    }
  };
  return (
    <div>
      <RestaurantForm
        restaurantData={restaurantData}
        restaurantService={restaurantService}
        HandleFirstChange={HandleFirstChange}
        HandleCheckChange={HandleCheckChange}
        onClick={OnSubmit}
        Errors={isError}
      />
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
  );
};

export default EditRestaurant;
