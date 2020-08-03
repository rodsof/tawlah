import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import RestaurantDetails from "./RestaurantDetails";
import useRestaurants from "../../hooks/useRestaurants";
import { slice } from "lodash";

const RestaurantList = () => {
  const { restaurants } = useRestaurants("votes");
  const LIMIT = 6;
  const [list, setList] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    if (restaurants.length < 6) setList(restaurants);
    else setList(slice(restaurants, 0, LIMIT));

    console.log(list);
  }, [restaurants]);
  return (
    <>
      {restaurants.length === 0 ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          {list.map((restaurant) => (
            <Grid item xs={12} md={4} key={restaurant.id}>
              <RestaurantDetails restaurant={restaurant} />
            </Grid>
          ))}
        </>
      )}
    </>
  );
};

export default RestaurantList;
