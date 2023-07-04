import { createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    primary: {
      light: "#A4C8FF", // blue/300
      main: "#4560E4", // blue/500
      dark: "rgba(237, 237, 255, 0.12)",
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
      color: "#000",
    },
    h2: {
      fontSize: 33,
      fontWeight: 500,
      lineHeight: "100%",
      color: "#000",
    },
    h3: {
      fontSize: 24,
      fontWeight: 800,
      lineHeight: "36px",
      color: "#000",
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: "16px",
      color: "#000",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "16px",
      color: "#323946",
    },
    body1: {
      fontSize: 16,
      lineHeight: "24px",
      fontWeight: 400,
      color: "#323946",
    },
    body2: {
      fontSize: 14,
      lineHeight: "16px",
      fontWeight: 400,
      color: "#323946",
    },
  },
});

export default theme;
