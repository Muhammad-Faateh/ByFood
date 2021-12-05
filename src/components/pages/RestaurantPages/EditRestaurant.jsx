import React, { useEffect } from "react";
import RestaurantForm from "../../controls/RestaurantForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OwnersService from "../../../services/OwnerService";
import { useHistory } from "react-router";
import RestaurantService from "../../../services/RestaurantService";
import LinearProgress from "@mui/material/LinearProgress";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditRestaurant = () => {
  const history = useHistory();
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
  const [restaurantImageName, setRestaurantImageName] = React.useState("");
  const [restaurantImage, setRestaurantImage] = React.useState("");
  const [isALert, setAlert] = React.useState({
    openAlert: false,
    AlertSeverityError: false,
    AlertMessage: "",
  });
  const [ownerID, setOwnerID] = React.useState("");
  const [isLoading, setloading] = React.useState(false);

  const getOwner = async () => {
    const LoggedInUser = await OwnersService.GetLoggedInUser();
    if (!(OwnersService.isLoggedIn() && LoggedInUser.data.role == "Owner")) {
      history.push("/");
    } else {
      let owner = LoggedInUser.data;
      setOwnerID(owner._id);
      setRestaurant({
        name: owner.restaurant.restaurantName,
        address: owner.restaurant.address,
        types: owner.restaurant.restaurantType,
      });
      setRestaurantService({
        dineIn: owner.restaurant.dineIn,
        takeAway: owner.restaurant.takeAway,
      });
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

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
  const HandleImageChange = (event) => {
    setRestaurantImage(event.target.files[0]);
    setRestaurantImageName(event.target.files[0].name);
  };
  const HandleCloseAlert = () => setAlert({ openAlert: false });

  const OnSubmit = async () => {
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
      const restaurantPackage = {
        restaurantName: restaurantData.name,
        address: restaurantData.address,
        restaurantType: restaurantData.types,
        dineIn: restaurantService.dineIn,
        takeAway: restaurantService.takeAway,
      };
      const restaurantFormData = new FormData();
      restaurantFormData.append("file", restaurantImage);
      restaurantFormData.append("upload_preset", "ByFoodCloud");
      restaurantFormData.append("cloud_name", "faatehcloud");
      const rawData = await fetch(
        "https://api.cloudinary.com/v1_1/faatehcloud/image/upload",
        {
          method: "post",
          body: restaurantFormData,
        }
      );
      if (!rawData) {
        setloading(true);
      } else {
        setloading(false);
        const originalData = await rawData.json();
        restaurantPackage.image = originalData.secure_url;

        RestaurantService.UpdateRestaurant(
          `restaurants/${ownerID}`,
          restaurantPackage
        ).catch((error) => {
          console.log(error);
        });
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
        setRestaurantImageName("");
        setRestaurantImage("");
      }
    }
  };
  return (
    <div>
      {isLoading && <LinearProgress color="secondary" />}
      <RestaurantForm
        restaurantData={restaurantData}
        restaurantService={restaurantService}
        HandleFirstChange={HandleFirstChange}
        HandleCheckChange={HandleCheckChange}
        onClick={OnSubmit}
        Errors={isError}
        HandleImageChange={HandleImageChange}
        restaurantImageName={restaurantImageName}
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
