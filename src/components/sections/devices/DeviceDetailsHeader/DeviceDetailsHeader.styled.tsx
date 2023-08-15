import { styled, Box } from "@mui/material";

export const HeadingTitleContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "18px",
  width: "35%",
});

export const HeadingMainTitleWithBadge = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
});

export const DeviceDetailsSubtitle = styled("h5")({
  color: "#76828F",
  fontFamily: "Gilroy",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "105%",
  letterSpacing: "-0.16px",
});
