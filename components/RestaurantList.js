import React from "react";
import { Grid } from "@material-ui/core";
import RestaurantDetails from "./RestaurantDetails";

const restaurants = [
  { id: "1", name: "name1" },
  { id: "2", name: "name2" },
  { id: "3", name: "name3" },
  { id: "4", name: "name4" },
];

const RestaurantList = () => {
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
