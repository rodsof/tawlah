import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import {
  makeStyles,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BookIcon from "@material-ui/icons/Book";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(4),
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
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
const UserMenu = () => {
  const classes = useStyles();

  const { user } = useContext(FirebaseContext);
  const { userDB, spinnerAuth, errorAuth } = useAuth();

  const isOwner = (user) => {
    if (userDB.roles.owner) return true;

    return false;
  };

  if (spinnerAuth && !errorAuth)
    return (
      <Box className={classes.box}>
        <CircularProgress color="primary"></CircularProgress>
      </Box>
    );
  if (errorAuth) {
    return <Alert severity="error">{error}</Alert>;
  }

  if(user && userDB && isOwner(userDB))
  return (
        <Box className={classes.box}>
          <Typography color="textPrimary" variant="h5">
            Add your restaurant to the site!
          </Typography>
          <Button
            color="primary"
            variant="contained"
            className={classes.addIconButton}
            onClick={() =>
              user ? Router.push("/new-restaurant") : Router.push("/signin")
            }
          >
            <AddIcon className={classes.addIcon} />
          </Button>
        </Box>
  )
  else {
      return(
        <Box className={classes.box}>
          <Button
            color="primary"
            variant="contained"
            className={classes.addIconButton}
            onClick={() =>
              user ? Router.push("/reservations") : Router.push("/signin")
            }
          >
            <BookIcon className={classes.addIcon} />
          </Button>
        </Box>
      )
}

};

export default UserMenu;
