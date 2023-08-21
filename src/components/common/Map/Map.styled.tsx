import { Box, Button, styled } from "@mui/material";

export const MapContainer = styled(Box)({
  height: "100vh",
  width: "100%",
  ".gm-style-iw.gm-style-iw-c": {
    background: "none",
    boxShadow: "none",
  },
  "button.gm-ui-hover-effect": {
    top: "6px !important",
    "& span": {
      backgroundColor: "#ffffff !important",
    },
  },
  ".gm-style-iw-d": {
    overflow: "hidden !important",
  },
  ".gm-style .gm-style-iw-tc::after": {
    background: "#192026E0",
  },
  ".gmnoprint .gm-style-mtc": {
    display: "none",
  },
  "button.gm-control-active.gm-fullscreen-control": {
    display: "none",
  },
});

export const MarkerLabel = styled(Box)({
  backgroundColor: "#1D1F2BB8",
  color: "#fff",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "14.4px",
  padding: "8px",
  borderRadius: "4px",
  marginLeft: 10,
});

export const MarkerBlip = styled(Box)({
  height: "6px",
  left: 0,
  position: "absolute",
  top: 0,
  transform: "translateX(-50%)",
  width: "12px",
  "::after": {
    clipPath: "polygon(0% 50%,50% 0%,50% 100%)",
    content: `""`,
    height: "16px",
    left: 5,
    position: "absolute",
    top: 6,
    width: "24px",
    background: "#192026c2",
  },
});

export const MapWrapper = styled(Box)({});

export const SearchFieldWrapper = styled(Box)({
  background: "#fff",
  borderRadius: "6px",
});

export const TopLeftSection = styled(Box)({
  display: "flex",
  gap: "8px",
  position: "absolute",
  top: "16px",
  left: "16px",
  zIndex: 99,
});

export const TopRightSection = styled(Box)({
  position: "absolute",
  top: "16px",
  right: "16px",
  zIndex: 99,
});

export const MiniButton = styled(Button)({
  background: "#fff",
  minWidth: "0",
  "&:hover": {
    background: "#fff",
  },
});
