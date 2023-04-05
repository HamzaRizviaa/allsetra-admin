import { createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    primary: {
      light: "#C4C4C4", // Light Grayish Black
      main: "#000000", // Black
      dark: "#404040",
    },
    secondary: {
      main: "#FFFF00", // Neon Yellow
    },
    info: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
    h1: {
      fontSize: 55,
      fontWeight: 800,
      lineHeight: "100%",
      color: "#fff",
    },
    h2: {
      fontSize: 33,
      fontWeight: 800,
      lineHeight: "100%",
      color: "#fff",
    },
    h3: {
      fontSize: 24,
      fontWeight: 800,
      lineHeight: "36px",
      color: "#fff",
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 700,
      lineHeight: "16px",
      color: "#fff",
    },
    body1: {
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: 400,
      color: "#fff",
    },
    body2: {
      fontSize: 12,
      lineHeight: "16px",
      fontWeight: 400,
      color: "#fff",
    },
  },
});

export default theme;
