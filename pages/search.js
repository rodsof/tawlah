import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantList from "../src/components/RestaurantList";
import Layout from "../src/components/Layout/Layout";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleSection: {
    margin: theme.spacing(3, 2),
    textAlign: "center",
    justifyContent: "center",
  },
}));

const Search = () => {
  const classes = useStyles();

  const router = useRouter();
  const {
    query: { q },
  } = router;

  // all restaurants
  const { restaurants } = useRestaurants("created");
  const [result, saveResult] = useState([]);

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(search) ||
        restaurant.description.toLowerCase().includes(search) ||
        restaurant.city.toLowerCase().includes(search)
      );
    });
    saveResult(filter);
  }, [q, restaurants]);

  return (
    <Layout>
      <div className={classes.titleSection}>
        <Typography color="textPrimary" variant="h2">
          Most Popular Restaurants
        </Typography>
      </div>
      <RestaurantList restaurants={result} />
    </Layout>
  );
};

export default Search;
