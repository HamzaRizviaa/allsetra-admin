import { FC } from "react";
import { Stack } from "@mui/material";
import {
  CardContainer,
  InfoIcon,
  SmallText,
  StyledAccessTimeIcon,
} from "./DeviceDetailsCard.styled";
import { IDevices } from "app/data/types";
import { Badge, ConnectionBadge } from "@vilocnv/allsetra-core";
import { CellTowerIcon } from "assets/icons";

export interface DeviceDetailsCardProps {
  device: IDevices | null;
}

const DeviceDetailsCard: FC<DeviceDetailsCardProps> = ({ device }) => (
  <CardContainer>
    <Stack direction={"column"} mt={2}>
      <Stack direction={"row"} spacing={2}>
        <ConnectionBadge status={device?.isOnLine ? "online" : "offline"} />
        <Badge colorScheme={"info"} icon={<CellTowerIcon />}>
          {device?.lastReceivedNetwork}
        </Badge>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        spacing={2}
        mt={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <StyledAccessTimeIcon />
          <SmallText>1h 23m ago (March 22, 2023 at 01:25)</SmallText>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <InfoIcon />
          <SmallText>Object was stationary</SmallText>
        </Stack>
      </Stack>
    </Stack>
  </CardContainer>
);

export default DeviceDetailsCard;
