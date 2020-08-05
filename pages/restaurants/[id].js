import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useRouter } from "next/router";
import Map from "../../src/components/Map";
import Layout from "../../src/components/Layout/Layout";
import {
  makeStyles,
  Box,
  Typography,
  Menu,
  CircularProgress,
  Container,
} from "@material-ui/core";
import RestaurantMenu from "../../src/components/Owner/RestaurantMenu";
import SwitchRestaurant from "../../src/components/Owner/SwitchRestaurant";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(4),
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  },
  titleSection: {
    margin: theme.spacing(3, 2),
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "regular",
  },
}));

const Restaurant = () => {
  const classes = useStyles();

  // component state
  const [restaurant, saveRestaurant] = useState({});
  const [error, saveError] = useState(null);
  const [consultDB, saveConsultDB] = useState(true);

  // Routing to get current id
  const router = useRouter();
  const {
    query: { id },
  } = router;
  // context firebase
  const { firebase, user } = useContext(FirebaseContext);
  useEffect(() => {
    if (id && consultDB) {
      const getRestaurant = async () => {
        const restaurantQuery = await firebase.db
          .collection("restaurants")
          .doc(id);
        const restaurant = await restaurantQuery.get();
        if (restaurant.exists) {
          saveRestaurant(restaurant.data());
          saveConsultDB(false);
        } else {
          saveError(true);
          saveConsultDB(false);
        }
      };
      getRestaurant();
    }
  }, [id]);
  const {
    name,
    description,
    street_address,
    city,
    zip_code,
    state,
    owner,
    active,
    menu
  } = restaurant;
  if (Object.keys(restaurant).length === 0 && !error)
    return (
      <Layout>
        <Box className={classes.box}>
          <CircularProgress color="primary"></CircularProgress>
        </Box>
      </Layout>
    );
  return (
    <Layout>
      <Container>
        <Typography className={classes.titleSection} variant="h2">
          Welcome! <b> {name} </b>
        </Typography>
        <Typography variant="h6">{description}</Typography>
        {user.uid === owner.id ? <SwitchRestaurant active={active} id={id} /> : 
                    <span>
                      {" "}
                      This restaurant is  { active ? <b>online </b>: <b>offline </b> } 
                    </span>
              
    }
        
        <Box className={classes.box}>
          <Map city={city} state={state} street_address={street_address} />
        </Box>
        <RestaurantMenu menu={menu} id={id}/>
      </Container>
    </Layout>
  );
};

export default Restaurant;
