import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Layout from "../src/components/Layout/Layout";
import firebase, { FirebaseContext } from "../firebase";
import Alert from "@material-ui/lab/Alert";

// validations
import useValidation from "../hooks/useValidation";
import validateLogin from "../validation/validateLogin";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

const STATE_INICIAL = {
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [error, saveError] = useState(false);
  const [spinner, saveSpinner] = useState(null);
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validateLogin, login);

  const { email, password } = values;
  const router = useRouter();
  const { userDB } = useContext(FirebaseContext);

  async function login() {
    saveSpinner(true);
    try {
      await firebase.login(email, password);

      router.push("/");
    } catch (error) {
      console.error("Error signin in ", error.message);
      saveError(error.message);
    }
  }

  // if someone is already logged in
  if (Object.keys(userDB).length !== 0) {
    if (userDB.roles.admin) router.push("/admin");

    router.push("/");
  }
  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              autoFocus
            />
            {errors.email && <Alert severity="error">{errors.email}</Alert>}

            <TextField
              variant="outlined"
              margin="normal"
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
            {errors.password && (
              <Alert severity="error">{errors.password}</Alert>
            )}

            {error && <Alert severity="error">{error} </Alert>}

            {spinner ? (
              <CircularProgress color="primary" />
            ) : (
              <>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default SignIn;
