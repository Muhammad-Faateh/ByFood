import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from "@mui/system";

const Input = styled("input")({
  display: "none",
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
    width: "30rem",
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

const MenuItemForm = (props) => {
  const classes = useStyle();
  const history = useHistory();

  const {
    menuItems,
    HandleChange,
    onClick,
    Errors,
    HandleImageChange,
    menuItemImageName,
    formName,
  } = props;
  const categories = [
    "Desi",
    "FastFood",
    "BBQ",
    "Pasta",
    "SeaFood",
    "Chinese",
    "Dessert",
    "Beverages",
    "Starters",
  ];

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
            {formName}
          </h1>
          {/*                    FORM                           */}

          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter Food Name"
                name="foodName"
                value={menuItems.foodName}
                onChange={HandleChange}
                error={Errors.nameError}
                helperText={Errors.nameError ? "Fill in the field" : ""}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter description"
                multiline
                rows={4}
                name="description"
                value={menuItems.description}
                onChange={HandleChange}
                error={Errors.descriptionError}
                helperText={Errors.descriptionError ? "Fill in the field" : ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                style={{ width: "100%" }}
                type="text"
                select
                label="Choose Category"
                name="category"
                value={menuItems.category}
                onChange={HandleChange}
                error={Errors.categoryError}
                helperText={
                  Errors.categoryError ? "Select one of the options" : ""
                }
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter price"
                type="number"
                name="price"
                value={menuItems.price}
                onChange={HandleChange}
                error={Errors.priceError}
                helperText={
                  Errors.priceError ? "price should be greater than 0" : ""
                }
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <ul style={{ listStyleType: "none", display: "inline-block" }}>
                <li style={{ display: "inline-block", marginRight: "3rem" }}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={HandleImageChange}
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
                  <p>{menuItemImageName}</p>
                </li>
              </ul>
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

export default MenuItemForm;
