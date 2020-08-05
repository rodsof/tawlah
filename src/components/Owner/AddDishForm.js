import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { FirebaseContext } from "../../../firebase";

//validation imports
import useValidation from "../../../hooks/useValidation";
import validateNewDish from "../../../validation/validateNewDish";
import Alert from "@material-ui/lab/Alert";

const STATE_INICIAL = {
  name: "",
  ingredients: "",
  category: [],
  price: "",
};

const AddDishForm = ({ id, menu }) => {
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validateNewDish, createDish);

  const [error, saveError] = useState(false);
  const [spinner, saveSpinner] = useState(null);
  const [success, saveSuccess] = useState(null);
  const { name, ingredients, category, price } = values;
  const { firebase } = useContext(FirebaseContext);

  async function createDish() {
    saveSpinner(true);
    // create object
    const dish = {
      name,
      ingredients,
      category,
      price,
    };

    // take copy of menu to add the new dish
    const newMenu = [...menu, dish];

    const userQuery = await firebase.db
      .collection("restaurants")
      .doc(id)
      .update({
        menu: newMenu,
      })
      .then(function (docRef) {
        saveSpinner(null);
        saveSuccess(true);
      })
      .catch(function (error) {
        saveSpinner(null);
        saveError("Error adding the dish, try again");
      });
    saveSpinner(null);
  }
  return (
    <form
      style={{
        padding: "2rem",
        backgroundColor: "white",
      }}
      onSubmit={handleSubmit}
      noValidate
    >
      <Typography variant="h5">Add a dish to the menu</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label htmlFor="ingredients">Name: </label>
          <TextField
            variant="outlined"
            fullWidth
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="PASTRAMI REUBEN EGG ROLLS"
          />
        </Grid>
        {errors.name && <Alert severity="error">{errors.name}</Alert>}

        <Grid item xs={12} sm={6}>
          <label htmlFor="ingredients">Ingredients: </label>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Shaved Pastrami, Swiss Cheese, Caraway Sauerkraut, Mustard Aioli, Russian Dressing"
            id="ingredients"
            name="ingredients"
            value={ingredients}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="ingredients"
          />
        </Grid>
        {errors.email && <Alert severity="error">{errors.ingredients}</Alert>}

        <Grid item>
          <FormControl
            style={{
              minWidth: 200,
            }}
          >
            <label htmlFor="category">Category: </label>

            <Select
              id="category"
              labelId="select"
              name="category"
              multiple
              variant="outlined"
              value={category}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="Lunch">Lunch Menu</MenuItem>
              <MenuItem value="Dinner">Dinner Menu</MenuItem>
              <MenuItem value="Bar">Bar Menu</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {errors.email && <Alert severity="error">{errors.ingredients}</Alert>}

        <Grid item xs={12} sm={6}>
          <label htmlFor="price">Price:</label>
          <TextField
            variant="outlined"
            fullWidth
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        {errors.password && <Alert severity="error">{errors.price}</Alert>}

        {error && <Alert severity="error">{error} </Alert>}
      </Grid>
      <Button type="submit" fullWidth variant="contained" color="primary">
        Add {name} to the Menu
      </Button>
      {spinner ? <CircularProgress color="primary" /> : null}
      {success ? <Alert severity="success">Dish added correctly!</Alert> : null}
    </form>
  );
};

export default AddDishForm;
