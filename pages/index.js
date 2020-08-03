import {
  Grid,
  IconButton,
  Divider,
  Container,
  Box,
  makeStyles,
  fade,
  Typography,
} from "@material-ui/core";
import RestaurantList from "../src/components/RestaurantList";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../src/components/Layout";

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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.10),
      color: theme.palette.primary.main
    },
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

  return (
    <Layout>
   <div className={classes.titleSection}>
       <Typography color="textPrimary" variant="h2">
          Browse restaurants: 
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
        <IconButton
          aria-label="add"
          className={classes.addIconButton}
        >
          <AddIcon className={classes.addIcon} />
        </IconButton>
      </Box> 
      </Layout>
  
  );
}
export default Index;