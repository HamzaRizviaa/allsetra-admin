import { styled, Box } from "@mui/material";

export const DeviceTypeHeading = styled(Box)({
  color: "#212B33",
  fontFamily: "Gilroy",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "105%",
  letterSpacing: "-0.16px",
});

export const DeviceTypeDetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  justifyContent: "center",
  width: "23vw",

  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));
