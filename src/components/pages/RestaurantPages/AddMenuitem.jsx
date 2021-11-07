import React from "react";
import { useHistory } from "react-router";
import MenuItemForm from "../../controls/MenuItemForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddMenuItem = () => {
  const history = useHistory();

  //                               STATES

  const [menuItems, setItems] = React.useState({
    foodName: "",
    description: "",
    category: "",
    price: 0,
  });
  const [isError, setError] = React.useState({
    nameError: false,
    descriptionError: false,
    priceError: false,
    categoryError: false,
  });
  const [isALert, setAlert] = React.useState({
    openAlert: false,
    AlertSeverityError: false,
    AlertMessage: "",
  });
  //             METHODS

  const HandleCloseAlert = () => {
    setAlert({ ...isALert, openAlert: false });
  };

  const HandleChange = (event) =>
    setItems({ ...menuItems, [event.target.name]: event.target.value });

  const OnSubmit = () => {
    if (
      menuItems.foodName === "" ||
      menuItems.description === "" ||
      menuItems.category === ""
    ) {
      setError({
        nameError: true,
        descriptionError: true,
        categoryError: true,
      });
      setAlert({
        openAlert: true,
        AlertSeverityError: true,
        AlertMessage: "Please fill in the form",
      });
    } else if (menuItems.price <= 0) {
      setError({
        nameError: false,
        descriptionError: false,
        categoryError: false,
        priceError: true,
      });
    } else {
      setItems({ foodName: "", description: "", category: "", price: 0 });
      setError({ ...isError, priceError: false });
      setAlert({
        openAlert: true,
        AlertSeverityError: false,
        AlertMessage: "Item successfully added",
      });
    }
  };
  //            RETURN START
  return (
    <div>
      <MenuItemForm
        menuItems={menuItems}
        HandleChange={HandleChange}
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

export default AddMenuItem;
