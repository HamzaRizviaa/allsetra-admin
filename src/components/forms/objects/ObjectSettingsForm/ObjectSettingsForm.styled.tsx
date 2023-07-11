import { styled, Typography, Box } from "@mui/material";

export const ChildFormBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginTop: "32px",
  },
}));

//
// DEVICE SETTINGS
//
export const DeviceName = styled(Typography)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontSize: "18px",
});
