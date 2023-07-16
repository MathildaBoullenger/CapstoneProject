import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FA8334 ", //pumpkin
    },
    secondary: {
      main: "#000000" //midnightBlue //003366
    },
    tertiary: {
      main: "#fffd77", //icterine
      dark: "#ffe882"//jasmine
    },

  },
  typography: {
    fontFamily: "'Quicksand', sans-serif", // The default font weight (400) will be used
    fontWeightMedium: 500, // Font weight for "medium" (500)
    fontWeightBold: 700, // Font weight for "bold" (700)
  },
});

export default theme;
