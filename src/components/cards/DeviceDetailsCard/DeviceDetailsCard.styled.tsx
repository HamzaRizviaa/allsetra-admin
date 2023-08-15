import { styled, Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

export const CardContainer = styled(Box)({
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #EEF1FF",
  background: "#fff",
});

export const SmallText = styled(Typography)<{
  color?: string;
}>(({ color }) => ({
  color: color || "#646D7B",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "132%",
}));

export const StyledAccessTimeIcon = styled(AccessTimeIcon)({
  width: "16px",
  height: "16px",
  color: "#646D7B",
});

export const InfoIcon = styled(InfoRoundedIcon)({
  width: "16px",
  height: "16px",
  color: "#959EB2",
});
