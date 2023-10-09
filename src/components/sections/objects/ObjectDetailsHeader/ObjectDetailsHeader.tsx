import { FC } from "react";
// import { Button } from "@vilocnv/allsetra-core";
import { Typography } from "@mui/material";
// import { ExpandMore } from "@mui/icons-material";
import { HeaderContainer, ButtonsWrapper } from "./ObjectDetailsHeader.styled";
// import { PointerHistoryIcon } from "assets/icons";

interface Props {
  objectName: string;
}

const ObjectDetailsHeader: FC<Props> = ({ objectName }) => (
  <HeaderContainer>
    <Typography variant={"h2"}>{objectName}</Typography>
    <ButtonsWrapper>
      {/* <Button
        variant={"outlined"}
        startIcon={<PointerHistoryIcon />}
        size={"small"}
      >
        Trips history
      </Button>
      <Button
        variant={"outlined"}
        startIcon={<PointerHistoryIcon />}
        size={"small"}
      >
        Location history
      </Button>
      <Button variant={"outlined"} endIcon={<ExpandMore />} size={"small"}>
        Configure
      </Button> */}
    </ButtonsWrapper>
  </HeaderContainer>
);

export default ObjectDetailsHeader;
