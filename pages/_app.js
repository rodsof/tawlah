import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../hooks/useAuth";
// import { configureLanguage } from "../utils/language";
import { Router } from "next/router";
const MyApp = (props) => {
  const { user, userDB } = useAuth();

  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <FirebaseContext.Provider
        value={{
          firebase,
          user,
          userDB,
        }}
      >
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </ThemeProvider>
  );
};

/*  MyApp.getInitialProps = async ({ ctx }) => {
  const language = configureLanguage(ctx);

  console.log("language:", language);

  return {
    language
  };
};  
 */

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default MyApp;
