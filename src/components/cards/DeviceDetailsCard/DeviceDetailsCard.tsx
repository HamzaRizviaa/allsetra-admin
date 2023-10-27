import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import {
  CardContainer,
  InfoIcon,
  SmallText,
  StyledAccessTimeIcon,
} from "./DeviceDetailsCard.styled";
import { IDevices } from "app/data/types";
import { Badge, ChargeBadge, ConnectionBadge } from "@vilocnv/allsetra-core";
import { CellTowerIcon } from "assets/icons";
import moment from "moment";

export interface DeviceDetailsCardProps {
  device: IDevices | null;
}

const DeviceDetailsCard: FC<DeviceDetailsCardProps> = ({ device }) => (
  <CardContainer>
    <Stack direction={"column"} mt={2}>
      <Stack direction={"row"} spacing={2}>
        <ConnectionBadge status={device?.isOnLine ? "online" : "offline"} />
        <Badge colorScheme={"info"} icon={<CellTowerIcon />}>
          {device?.lastReceivedNetwork ?? "N/A"}
        </Badge>
        {device?.lastBatteryValue ? (
          <ChargeBadge percentage={Number(device.lastBatteryValue)} />
        ) : (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#76828F",
            }}
          >
            N/A
          </Typography>
        )}
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
          <SmallText>
            {moment(device?.lastUpdated || device?.created).format("LLL")}
          </SmallText>
        </Stack>
        {/* <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <InfoIcon />
          <SmallText>Object was stationary</SmallText>
        </Stack> */}
      </Stack>
    </Stack>
  </CardContainer>
);

export default DeviceDetailsCard;
