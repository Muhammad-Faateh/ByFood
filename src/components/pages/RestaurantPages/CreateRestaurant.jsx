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
import OwnersService from "../../../services/OwnerService";
import RestaurantService from "../../../services/RestaurantService";
import LinearProgress from '@mui/material/LinearProgress';
import RestaurantModal from '../../controls/RestaurantModal'
import Loading from "../../controls/Loading";

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

  const [restaurantImage, setRestaurantImage] = React.useState("");
  const [restaurantImageName, setRestaurantImageName] = React.useState("");
  const [menuImage, setMenuImage] = React.useState("");
  const [menuImageName, setMenuImageName] = React.useState("");

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
  const [modal , setModal] = React.useState({
    openModal : false,
    title : '',
    body : ''
  })
  const [loading , setLoading] = React.useState(false);
  const getOwner = async () => {
    const loggedInOwner = await OwnersService.GetLoggedInUser();
    if(loggedInOwner === undefined || loggedInOwner === null){
      setLoading(true)
    }else{
      setLoading(false)
      if (
        !(OwnersService.isLoggedIn() && loggedInOwner.data.role === "Owner")
      ) {
        history.push("/");
      } else if (loggedInOwner.data.restaurant !== undefined) {
        history.push("/myrestaurant");
      }

    }
    
  };

  //                                  USEEFFECT

  React.useEffect(() => {
    
    getOwner();
  }, [loading]);

  const HandleCloseModal = ()=> setModal({...modal , openModal : false})

  const HandleChange = (event) =>
    setItems({ ...menuItems, [event.target.name]: event.target.value });

  const HandleRestaurantImageChange = (event) => {
    setRestaurantImageName(event.target.files[0].name);
    setRestaurantImage(event.target.files[0]);
  };
  const HandleMenuImageChange = (event) => {
    setMenuImageName(event.target.files[0].name);
    setMenuImage(event.target.files[0]);
  };

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

  const FinishSubmit = async () => {
    const GetLoggedInOwner = await OwnersService.GetLoggedInUser();
    const restaurant = {
      restaurantName: restaurantinfo.restaurantName,
      address: restaurantinfo.address,
      restaurantType: restaurantinfo.restaurantType,
      dineIn: restaurantService.dineIn,
      takeAway: restaurantService.takeAway,
    };

    const formData = new FormData();
    formData.append("file", restaurantImage);
    formData.append("upload_preset", "ByFoodCloud");
    formData.append("cloud_name", "faatehcloud");
    const restRawData = await fetch(
      "https://api.cloudinary.com/v1_1/faatehcloud/image/upload",
      {
        method: "post",
        body: formData,
      }
    );
    const orginalRestData = await restRawData.json();
    

    const menuData = new FormData();
    menuData.append("file", menuImage);
    menuData.append("upload_preset", "ByFoodCloud");
    menuData.append("cloud_name", "faatehcloud");
    const rawData = await fetch(
      "https://api.cloudinary.com/v1_1/faatehcloud/image/upload",
      {
        method: "post",
        body: menuData,
      }
    );
    const originalData = await rawData.json();
    
      restaurant.image = orginalRestData.secure_url;

    const menuItem = {
      foodName: menuItems.foodName,
      description: menuItems.description,
      price: menuItems.price,
      category: menuItems.category,
    };
      menuItem.image = originalData.secure_url;
    const restaurantPackage = {
      _id: GetLoggedInOwner.data._id,
      restaurant,
      menuItem,
    };

    RestaurantService.CreateRestaurantWithItem(
      "restaurants",
      restaurantPackage
    ).then((response)=>{
      getOwner();
      history.push("/myrestaurant");
    });
    


    
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
            HandleRestaurantImageChange={HandleRestaurantImageChange}
            restaurantImageName={restaurantImageName}
          />
        );
      case 1:
        return (
          <div>
            <OneMenuItemAdd
              menuItems={menuItems}
              Errors={menuError}
              onChange={HandleChange}
              HandleMenuImageChange={HandleMenuImageChange}
              menuImageName={menuImageName}
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
      {loading ? <Loading /> : <div>
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

        {
          <div className={classes.ContentSection}>{ShowContent()}</div>
        }

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
        <RestaurantModal modal = {modal} HandleCloseModal = {HandleCloseModal} />
      </div>
    </div>}
    </div>
    
  );
};;

export default CreateRestaurant;
