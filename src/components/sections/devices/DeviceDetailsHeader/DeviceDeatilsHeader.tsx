import { FC } from "react";
import { Badge, Button } from "@vilocnv/allsetra-core";
import { Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { PointerHistoryIcon } from "assets/icons";
import {
  ButtonsWrapper,
  HeaderContainer,
} from "components/sections/objects/ObjectDetailsHeader/ObjectDetailsHeader.styled";
import {
  DeviceDetailsSubtitle,
  HeadingMainTitleWithBadge,
  HeadingTitleContainer,
} from "./DeviceDetailsHeader.styled";
import { useNavigate } from "react-router-dom";

interface Props {
  deviceName: string;
  deviceType: string;
  status: string;
  deviceId: string;
}

const DeviceDetailsHeader: FC<Props> = ({
  deviceName,
  status,
  deviceId,
  deviceType,
}) => {
  const navigate = useNavigate();

  const colorScheme: any = {
    Active: "success",
    None: "error",
  }[status];

  return (
    <HeaderContainer>
      <HeadingTitleContainer>
        <DeviceDetailsSubtitle>{deviceType}</DeviceDetailsSubtitle>
        <HeadingMainTitleWithBadge
          flexDirection={{ md: "row", xs: "column" }}
          gap={{ xs: "12px", md: "0px" }}
        >
          <Typography variant={"h2"}>{deviceName}</Typography>
          <Badge colorScheme={colorScheme || "success"}>{status}</Badge>
        </HeadingMainTitleWithBadge>
      </HeadingTitleContainer>
      <ButtonsWrapper>
        <Button
          variant={"outlined"}
          startIcon={<PointerHistoryIcon />}
          size={"small"}
          onClick={() =>
            navigate(`/dashboard/devices/${deviceId}/location-history`)
          }
        >
          Location history
        </Button>
        <Button variant={"outlined"} endIcon={<ExpandMore />} size={"small"}>
          Configure
        </Button>
      </ButtonsWrapper>
    </HeaderContainer>
  );
};

export default DeviceDetailsHeader;
