import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography, Container, Box, makeStyles } from "@material-ui/core";
import RestaurantDetails from "./RestaurantDetails";
import { slice } from "lodash";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(4),
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  }
}));

const RestaurantList = ({restaurants, spinner, error}) => {
  const classes = useStyles();
  const LIMIT = 6;
  const [list, setList] = useState([]);
  useEffect(() => {
    
    if (restaurants.length < 6) setList(restaurants);
    else setList(slice(restaurants, 0, LIMIT));

  }, [restaurants]);

  
  if (spinner && !error ){
    return(
      <Box className={classes.box}>
      <CircularProgress color="primary"></CircularProgress>
      </Box>
    )
  }

  return (
    <>
    { error ? <Box className={classes.box}><Alert severity="error" >{error}</Alert> </Box> : null }
    { restaurants.length === 0 ? 
      <Box className={classes.box}>
      <Typography component="h3" >Sorry, there aren't restaurants yet :(</Typography>
      </Box>
    : <>
          {list.map((restaurant) => (
            <Grid item xs={12} md={4} key={restaurant.id}>
              <RestaurantDetails restaurant={restaurant} />
            </Grid>
          ))}
          </>
}
    </>
  );
};

export default RestaurantList;
