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
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Input = styled("input")({
  display: "none",
});

const AddRestaurant = (props) => {
  const {
    restaurantinfo,
    firstChange,
    secondChange,
    Errors,
    restaurantService,
    HandleRestaurantImageChange,
    restaurantImageName,
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
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} style={{ width: "50%", height: "100%" }}>
        <h1 style={{ textAlign: "center", padding: "2rem  0px" }}>
          Create Restaurant
        </h1>
        <div style={{ padding: "2rem 2rem" }}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter restaurant Name"
                name="restaurantName"
                value={restaurantinfo.restaurantName}
                onChange={firstChange}
                error={Errors.nameError}
                helperText={Errors.nameError ? "Fill in the field" : ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter Restaurant Address"
                name="address"
                value={restaurantinfo.address}
                onChange={firstChange}
                error={Errors.addressError}
                helperText={Errors.addressError ? "Fill in the field" : ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                style={{ width: "100%" }}
                type="text"
                select
                label="Choose your Type"
                name="restaurantType"
                value={restaurantinfo.restaurantType}
                onChange={firstChange}
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
            <Grid item md={6} xs={12}>
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
                          onChange={secondChange}
                          name="dineIn"
                        />
                      }
                      label="Dine In"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={restaurantService.takeAway}
                          onChange={secondChange}
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
            <Grid item md={12} xs={12}>
              <ul style={{ listStyleType: "none", display: "inline-block" }}>
                <li style={{ display: "inline-block", marginRight: "3rem" }}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={HandleRestaurantImageChange}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<FileUploadIcon />}
                    >
                      Upload Image
                    </Button>
                  </label>
                </li>
                <li style={{ display: "inline-block" }}>
                  <p>{restaurantImageName}</p>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default AddRestaurant;
