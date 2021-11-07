import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import React from "react";

const OneMenuItemAdd = (props) => {
  console.log(props);
  const { Errors, menuItems, onChange } = props;
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
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Paper elevation={3} style={{ width: "30rem", height: "27rem" }}>
        <h1 style={{ textAlign: "center", padding: "2rem  0px" }}>
          Add Menu Item
        </h1>
        <div style={{ padding: "0px 1rem 2rem 1rem" }}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Enter Food Name"
                name="foodName"
                value={menuItems.foodName}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
                error={Errors.priceError}
                helperText={
                  Errors.priceError ? "price should be greater than 0" : ""
                }
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default OneMenuItemAdd;
