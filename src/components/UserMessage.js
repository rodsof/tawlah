import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import {
  makeStyles,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/Add";
import BookCircleIcon from "@material-ui/icons/Book";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
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
    marginBottom: theme.spacing(2),
  },
  addIcon: {
    width: "3em",
    height: "3em",
  },
}));
const UserMessage = () => {
  const classes = useStyles();

  const { user, userDB } = useContext(FirebaseContext);
  const { errorAuth } = useAuth();



  if (errorAuth) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (user && Object.keys(userDB).length !== 0 ) {
    if (userDB.roles.owner) {
      return (
        <Box className={classes.box}>
          <Typography color="textPrimary" variant="h5">
            Add your restaurant to the site!
          </Typography>
          <IconButton
            color="primary"
            variant="contained"
            onClick={() =>
               Router.push("/new-restaurant") 
            }
          >
            <AddCircleIcon className={classes.addIcon}/>
          </IconButton>
        </Box>
      );
    } else if (userDB.roles.admin) {
      return (
        <Box className={classes.box}>
          <IconButton
            color="primary"
            variant="contained"
            onClick={() =>
              Router.push("/admin")
            }
          >
            <SupervisorAccountIcon className={classes.addIcon}/>
          </IconButton>
        </Box>
      );
    }
    else {
      return (
        <Box className={classes.box}>
          <IconButton
            color="primary"
            variant="contained"
            onClick={() =>
              user ? Router.push("/reservations") : Router.push("/signin")
            }
          >
            <BookCircleIcon className={classes.addIcon}/>
          </IconButton>
        </Box>
      );
    }
  }

  return (
    <Box className={classes.box}>
      <CircularProgress color="primary"></CircularProgress>
    </Box>
  );
};

export default UserMessage;
