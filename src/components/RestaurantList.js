import React from "react";
import { Grid } from "@material-ui/core";
import RestaurantDetails from "./RestaurantDetails";

const restaurants = [
  { id: "1", name: "name1" },
  { id: "2", name: "name2" },
  { id: "3", name: "name3" },
  { id: "4", name: "name4" },
];

const images = [
  {
    url: '/static/pizza.jpg',
    title: 'Breakfast',
    width: '100%',
  },
  {
    url: '/static/burger.jpg',
    title: 'Burgers',
    width: '100%',
  },
  {
    url: '/static/pizza.jpg',
    title: 'Camera',
    width: '100%',
  },
];

const RestaurantList = () => {
  return (
    <>
      {images.map((image) => (
        <Grid item xs={12} md={4} key={image.url}>
          <RestaurantDetails  image={image} />
        </Grid>
      ))}
    </>
  );
};

export default RestaurantList;
