// Global theme shared acros the app

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FA8334 ", //pumpkin
    },
    secondary: {
      main: "#000000" //or midnightBlue? 003366
    },
    tertiary: {
      main: "#fffd77", //icterine
      dark: "#ffe882"//jasmine
    },

  },
  typography: {
    fontFamily: "'Quicksand', sans-serif", // default font weight (400) will be used
    fontWeightMedium: 500, // "medium" (500)
    fontWeightBold: 700, // "bold" (700)
  },
});

export default theme;
