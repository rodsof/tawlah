import React, { useState, useContext } from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import { FirebaseContext } from "../../../firebase";

import Alert from "@material-ui/lab/Alert";

const DeleteDishForm = ({ selected, numSelected, menu, id, handler }) => {
  const [error, saveError] = useState(false);
  const [spinner, saveSpinner] = useState(null);
  const [success, saveSuccess] = useState(null);

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteDish();
  };
  async function deleteDish() {
    saveSpinner(true);

    // take copy of menu to delete the dish
    const newMenu = menu.filter((dish) => !selected.includes(dish.name));

    const userQuery = await firebase.db
      .collection("restaurants")
      .doc(id)
      .update({
        menu: newMenu,
      })
      .then(function (docRef) {
        saveSpinner(null);
        saveSuccess(true);
        handler();
      })
      .catch(function (error) {
        saveSpinner(null);
        saveError("Error deleting the dish, try again");
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
      <Typography variant="h5">
        Are you sure you want to delete this{" "}
        {numSelected > 1 ? `dishes: ` : `dish: `} {selected}{" "}
      </Typography>

      {spinner ? <CircularProgress color="primary" /> : null}
      {success ? (
        <Alert severity="success" style={{
            marginTop: "2rem"
          }}>Dish deleted correctly!</Alert>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{
            marginTop: "2rem",
          }}
        >
          Yes
        </Button>
      )}
    </form>
  );
};

export default DeleteDishForm;
