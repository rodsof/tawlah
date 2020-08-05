import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Container,
  Box,
  makeStyles,
} from "@material-ui/core";
import RestaurantDetails from "../RestaurantDetails";
import { slice } from "lodash";
import Alert from "@material-ui/lab/Alert";
import { FirebaseContext } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(4),
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  },
}));

const MyRestaurants = ({ restaurants, spinner, error }) => {
  const classes = useStyles();
  const { user } = useContext(FirebaseContext);
  const [result, saveResult] = useState([]);

  useEffect(() => {
    const filter = restaurants.filter((restaurant) => {
      return restaurant.owner.id.includes(user.uid);
    });
    saveResult(filter);
  }, [restaurants]);

  if (!spinner && !error && result.length === 0) {
    return (
      <Box className={classes.box}>
        <Typography component="h3">
          {" "}
          Hi { user.displayName } , let's add your restaurant to the site! 
        </Typography>
      </Box>
    );
  }
  if (!spinner && error) {
    return (
      <Box className={classes.box}>
        <Alert severity="error">{error}</Alert>{" "}
      </Box>
    );
  }

    if (!spinner && !error && result) {
      return (
        <>
        <Box className={classes.box}>
         <Typography color="textPrimary" variant="h2">
          Your Restaurants
        </Typography>
        </Box>
          {result.map((restaurant) => (
            <Grid item xs={12} md={4} key={restaurant.id}>
              <RestaurantDetails restaurant={restaurant} />
            </Grid>
          ))}
        </>
      );
    }

    // this is default return
    return (
      <Box className={classes.box}>
        <CircularProgress color="primary"></CircularProgress>
      </Box>
    );

};

export default MyRestaurants;
