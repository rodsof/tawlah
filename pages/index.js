import { Grid, Divider, makeStyles, fade, Typography } from "@material-ui/core";
import RestaurantList from "../src/components/RestaurantList";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../src/components/Layout";
import { FirebaseContext } from "../firebase";
import { useContext } from "react";
import Router from "next/router";
import useRestaurants from "../hooks/useRestaurants";
import UserMenu from "../src/components/UserMessage";

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
  },
  restaurantsSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: fade(theme.palette.common.black, 0.1),
  },
  addIconButton: {
    borderRadius: theme.spacing(8),
    padding: theme.spacing(2, 2),
    marginTop: theme.spacing(2),
  },
  addIcon: {
    width: "3em",
    height: "3em",
  },
}));
const Index = () => {
  const classes = useStyles();
  const { restaurants, spinner, error } = useRestaurants("votes");

  return (
    <Layout>
      <div className={classes.titleSection}>
        <Typography color="textPrimary" variant="h2">
          Most Popular Restaurants
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.restaurantsSection}>
        <Grid container spacing={4}>
          <RestaurantList
            restaurants={restaurants}
            spinner={spinner}
            error={error}
          />
        </Grid>
      </div>
      <Divider variant="middle" />
      <UserMenu />
    </Layout>
  );
};
export default Index;
