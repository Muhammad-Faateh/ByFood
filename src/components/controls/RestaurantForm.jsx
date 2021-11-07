import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import { Box } from "@mui/system";

//                                  STYLING

const useStyle = makeStyles({
  PaperWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  Paper: {
    width: "24rem",
    margin: "0.5rem",
    padding: "10px",
  },
  SubmitSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
});
//                              COMPONENT START

const RestaurantForm = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const {
    restaurantData,
    restaurantService,
    HandleFirstChange,
    HandleCheckChange,
    onClick,
    Errors,
  } = props;

  const restaurantTypes = [
    "Desi Restaurant",
    "FastFood",
    "Italian",
    "Chinese",
    "Japanese",
    "Pan Asian",
    "Cafe",
    "IceCream Parlour",
  ];

  //                             STATES

  //                                   RETURN START

  return (
    <div>
      <div className={classes.PaperWrapper}>
        <Paper elevation={3} className={classes.Paper}>
          <Button
            style={{ color: "#E0475B" }}
            onClick={() => history.push("/myrestaurant")}
          >
            <ArrowBackIcon />
          </Button>
          <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Edit Restaurant
          </h1>
          {/*                    FORM                           */}

          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter restaurant Name"
                name="name"
                value={restaurantData.name}
                onChange={HandleFirstChange}
                error={Errors.nameError}
                helperText={Errors.nameError ? "Fill in the field" : ""}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter Restaurant Address"
                name="address"
                value={restaurantData.address}
                onChange={HandleFirstChange}
                error={Errors.addressError}
                helperText={Errors.addressError ? "Fill in the field" : ""}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                variant="outlined"
                style={{ width: "100%" }}
                type="text"
                select
                label="Choose your Type"
                name="types"
                value={restaurantData.types}
                onChange={HandleFirstChange}
                error={Errors.typesError}
                helperText={Errors.typesError ? "Fill in the field" : ""}
              >
                {restaurantTypes.map((types, index) => (
                  <MenuItem key={index} value={types}>
                    {types}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <FormControl
                  error={Errors.serviceError}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend" style={{ textAlign: "center" }}>
                    Services
                  </FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={restaurantService.dineIn}
                          onChange={HandleCheckChange}
                          name="dineIn"
                        />
                      }
                      label="Dine In"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={restaurantService.takeAway}
                          onChange={HandleCheckChange}
                          name="takeAway"
                        />
                      }
                      label="Take Away"
                    />
                  </FormGroup>
                  <FormHelperText style={{ textAlign: "center" }}>
                    {Errors.serviceError
                      ? "You have to choose atleast one"
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <div className={classes.SubmitSection}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: "#E0475B" }}
              onClick={onClick}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default RestaurantForm;
