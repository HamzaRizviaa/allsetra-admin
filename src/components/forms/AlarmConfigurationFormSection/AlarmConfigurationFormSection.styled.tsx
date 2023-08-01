import { styled, Box } from "@mui/material";

export const ChildFormBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginTop: "32px",
  },
}));
