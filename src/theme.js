const { createMuiTheme } = require("@material-ui/core");

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ff5722",
        white: "#fff",
        light: "#ffe5d9"
            },
      gray: {
        main: "#999"
      }
    },
  });

  export default theme;