import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Layout from "../src/components/Layout/Layout";
import { FirebaseContext } from "../firebase";
import Alert from "@material-ui/lab/Alert";
import FileUploader from "react-firebase-file-uploader";
import QRCode from "qrcode";

// validations
import useValidation from "../hooks/useValidation";
import validateNewRestaurant from "../validation/validateNewRestaurant";
import { useRouter } from "next/router";
import { Snackbar } from "@material-ui/core";
import Lost from "../src/components/Layout/Lost";

const STATE_INICIAL = {
  name: "",
  description: "",
  image: "",
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textArea: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    padding: "1rem",
    height: theme.spacing(14),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  canva: {
    marginBottom: "10rem",
    padding: "1rem",
    height: theme.spacing(22),
    width: "100%",
  },
}));

const SignIn = () => {
  const classes = useStyles();

  // state de las imagenes
  const [imagename, saveName] = useState("");
  const [uploading, saveUploading] = useState(false);
  const [progress, saveProgress] = useState(0);
  const [imageurl, saveImageUrl] = useState("");
  const [error, saveError] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validateNewRestaurant, createRestaurant);

  const {
    name,
    description,
    image,
    city,
    street_address,
    state,
    zip_code,
  } = values;

  // hook routing
  const router = useRouter();

  // context crud firebase
  const { user, userDB, firebase } = useContext(FirebaseContext);
  /* 
  useEffect(() => {
    // code to run on component mount
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    autocomplete.addListener("place_changed", handlePlaceSelect)
  }, []) */

  const generateQR = (url) => {
    setOpen(true);

    QRCode.toCanvas(document.getElementById("canvas"), url, function (error) {
      if (error) console.error(error);
    });
  };
  async function createRestaurant() {
    let url = "";
    // it's necessary to be logged in
    if (!user) {
      return router.push("/login");
    }

    // create object
    const restaurant = {
      name,
      imageurl,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      owner: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],
      street_address,
      city,
      state,
      zip_code,
      active: true,
    };

    // insert into db
    firebase.db
      .collection("restaurants")
      .add(restaurant)
      .then(function (docRef) {
        saveError(false);
        url = "/restaurants/" + docRef.id;
        // generate qr
        generateQR(url);
      })
      .catch(function (error) {
        saveError("Error creating the restaurant, try again");
      });
  }

  const handleUploadStart = () => {
    saveProgress(0);
    saveUploading(true);
  };

  const handleProgress = (progress) => saveProgress({ progress });

  const handleUploadError = (error) => {
    saveUploading(error);
    console.error(error);
  };

  const handleUploadSuccess = (name) => {
    saveProgress(100);
    saveUploading(false);
    saveName(name);
    firebase.storage
      .ref("restaurants")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        saveImageUrl(url);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  /* 
  const handlePlaceSelect = () => {
    let addressObject = autocomplete.getPlace();
    let address = addressObject.address_components;
    saveStreetAddress(`${address[0].long_name} ${address[1].long_name}`);
    saveCity(address[4].long_name);
    saveState(address[6].short_name);
    saveZipCode(address[8].short_name);
    saveGoogleMapLink(addressObject.url);
  }; */

  if (Object.keys(userDB).length !== 0 && userDB.roles.owner){
  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add your Restaurant
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Your restaurant's name"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              autoFocus
            />
            {errors.name && <Alert severity="error">{errors.name}</Alert>}

            <label htmlFor="description">Description</label>
            <textarea
              label="Description"
              type="description"
              id="description"
              name="description"
              className={classes.textArea}
              value={description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && (
              <Alert severity="error">{errors.description}</Alert>
            )}

            <div>
              <label htmlFor="image">
                Image <br />
              </label>
              <FileUploader
                accept="image/*"
                id="image"
                name="image"
                randomizeFilename
                storageRef={firebase.storage.ref("restaurants")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>

            <div>
              Location
              {/* <input
                id="autocomplete"
                className="input-field"
                type="text"
              /> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="city"
                value={city}
                label="City"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.city && <Alert severity="error">{errors.city}</Alert>}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="street_address"
                value={street_address}
                label="Street Address"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.street_address && (
                <Alert severity="error">{errors.street_address}</Alert>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="state"
                value={state}
                label={"State"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="zip_code"
                value={zip_code}
                label="Zipcode"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.zip_code && (
                <Alert severity="error">{errors.zip_code}</Alert>
              )}
            </div>

            {error && <Alert severity="error">{error} </Alert>}

            {open ? (
              <Snackbar
                open={open}
                autoHideDuration={24000}
                onClose={handleClose}
              >
                <Alert severity="success">
                  <canvas id="canvas" />
                  SCAN TO GET YOUR RESTAURANT URL
                </Alert>
              </Snackbar>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add your restaurant to Tawlah
              </Button>
            )}
          </form>
        </div>
      </Container>
    </Layout>
  );
            }
            else{
              return (
                <Layout>
               <Lost />
              </Layout>
              )
            }
};

export default SignIn;
