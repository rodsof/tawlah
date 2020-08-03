import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import RestaurantDetails from "./RestaurantDetails";
import useRestaurants from '../../hooks/useRestaurants';

const RestaurantList = () => {
  const { restaurants} = useRestaurants('votes');

  return (
    <>
      {restaurants.map((restaurant) => (
        <Grid item xs={12} md={4} key={restaurant.id}>
          <RestaurantDetails  restaurant={restaurant} />
        </Grid>
      ))}
    </>
  );
};

export default RestaurantList;
