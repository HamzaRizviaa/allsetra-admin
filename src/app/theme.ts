import { createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    primary: {
      light: "#EEF1FF", // blue/200
      main: "#4560E4", // blue/500
      dark: "#404040",
    },
    secondary: {
      light: "#D5D9E8", // gray/300
      main: "#646D7B", // gray/600
      dark: "#1D1F2B", // gray/900
    },
    info: {
      light: "#A4C8FF", // blue/300
      main: "#0269EC", // blue/600
    },
    error: {
      light: "#FA8282", // red/100
      main: "#CC1010", // red/600
    },
    success: {
      light: "#8ED78C", // green/300
      main: "#148E20", // green/600
    },
    warning: {
      light: "#FACA82", // orange/300
      main: "#E28E10", // orange/600
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
