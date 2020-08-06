import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Layout from "../src/components/Layout/Layout";
import firebase, { FirebaseContext } from "../firebase";

// validations
import useValidation from "../hooks/useValidation";
import validateSignup from "../validation/validateSignup";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

const STATE_INICIAL = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [error, saveError] = useState(false);
  const router = useRouter();
  const { user } = useContext(FirebaseContext);
  if (user) router.push("/"); // can be done better
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validateSignup, signUp);

  const { name, surname, email, password } = values;

  async function signUp() {
    try {
      await firebase.register(name, surname, email, password);
      router.push("/");
    } catch (error) {
      console.error("Error creating the user ", error.message);
      saveError(error.message);
    }
  }

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              {errors.name && <Alert severity="error">{errors.name}</Alert>}

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="surname"
                  name="surname"
                  value={surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Last Name"
                  autoComplete="lname"
                />
              </Grid>
              {errors.surname && (
                <Alert severity="error">{errors.surname}</Alert>
              )}

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
              </Grid>
              {errors.email && <Alert severity="error">{errors.email}</Alert>}

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />
              </Grid>
              {errors.password && (
                <Alert severity="error">{errors.password}</Alert>
              )}

              {error && <Alert severity="error">{error} </Alert>}
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
     
      </Container>
    </Layout>
  );
};

export default SignUp;
