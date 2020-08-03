import {
  Grid,
  IconButton,
  Divider,
  Container,
  Box,
  makeStyles,
  fade,
  Typography,
  Button,
} from "@material-ui/core";
import RestaurantList from "../src/components/RestaurantList";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../src/components/Layout";
import { FirebaseContext } from "../firebase";
import { useContext } from "react";
import Router from 'next/router';

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
    backgroundColor: fade(theme.palette.common.black, 0.10),
  },
  addIconButton: {
    borderRadius: theme.spacing(8),
    padding: theme.spacing(2,2),
    marginTop: theme.spacing(2)
  },
  addIcon: {
    width: "3em",
    height: "3em",
  },
}));
const Index = () => {
  const classes = useStyles();
  const {user, firebase} = useContext(FirebaseContext)
  return (
    <Layout>
   <div className={classes.titleSection}>
       <Typography color="textPrimary" variant="h2">
          Most Popular Restaurants 
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.restaurantsSection} >
      <Grid container spacing={4}>
        <RestaurantList />
      </Grid>
      </div>
      <Divider variant="middle" />
      <Box className={classes.box}>
      <Typography color="textPrimary" variant="h5">
          Add your restaurant to the site!
        </Typography>
        <Button
          color="primary"
          variant="contained"
          className={classes.addIconButton}
          onClick={ () => user ? Router.push('/new-restaurant') : Router.push('/signin')}
        >
          <AddIcon className={classes.addIcon} />
        </Button>
      </Box> 
      </Layout>
  
  );
}
export default Index;