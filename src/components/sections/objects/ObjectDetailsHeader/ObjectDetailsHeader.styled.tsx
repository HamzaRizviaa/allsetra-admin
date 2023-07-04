import { styled, Box } from "@mui/material";

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ButtonsWrapper = styled(Box)({
  ["> :not(:last-child)"]: {
    marginRight: "16px",
  },
});
