import { styled, Box } from "@mui/material";

export const TimelineContainer = styled(Box)(({ theme }) => ({
  maxHeight: "65vh",
  overflowY: "scroll",
  scrollBehavior: "smooth",

  ["::-webkit-scrollbar"]: {
    width: 0 /* Remove scrollbar space */,
    background: "transparent" /* Optional: just make scrollbar invisible */,
  },

  [theme.breakpoints.down("md")]: {
    maxHeight: "none",
    overflowY: "hidden",
    marginBottom: "20px",
  },
}));

export const DateRangeContainer = styled(Box)({
  marginTop: "20px",
  marginBottom: "30px",
  width: "100%",
});
