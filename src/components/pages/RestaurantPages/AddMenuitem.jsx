import React, { useEffect } from "react";
import { useHistory } from "react-router";
import MenuItemForm from "../../controls/MenuItemForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OwnersService from "../../../services/OwnerService";
import MenuService from "../../../services/MenuService";

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
  const [menuItemImageName, setMenuImageName] = React.useState("");
  const [menuItemImage, setMenuImage] = React.useState("");
  const [ownerId, setOwnerId] = React.useState("");

  const getOwner = async () => {
    const LoggedInOwner = await OwnersService.GetLoggedInUser();
    if (!(OwnersService.isLoggedIn() && LoggedInOwner.data.role === "Owner")) {
      history.push("/");
    } else {
      setOwnerId(LoggedInOwner.data._id);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);
  //             METHODS

  const HandleCloseAlert = () => {
    setAlert({ ...isALert, openAlert: false });
  };
  const HandleImageChange = (event) => {
    setMenuImage(event.target.files[0]);
    setMenuImageName(event.target.files[0].name);
  };

  const HandleChange = (event) =>
    setItems({ ...menuItems, [event.target.name]: event.target.value });

  const OnSubmit = async () => {
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
      const menuFormData = new FormData();
      menuFormData.append("file", menuItemImage);
      menuFormData.append("upload_preset", "ByFoodCloud");
      menuFormData.append("cloud_name", "faatehcloud");
      const rawData = await fetch(
        "https://api.cloudinary.com/v1_1/faatehcloud/image/upload",
        {
          method: "post",
          body: menuFormData,
        }
      );
      const originalData = await rawData.json();
      menuItems.image = originalData.secure_url;
      menuItems.ownerid = ownerId;
      MenuService.CreateMenuItem("menuitems", menuItems).catch((error) => {
        console.log(error);
      });
      setMenuImage("");
      setMenuImageName("");
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
        HandleImageChange={HandleImageChange}
        menuItemImageName={menuItemImageName}
        formName={"Add Item"}
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