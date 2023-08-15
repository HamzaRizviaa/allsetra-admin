import { Box, Stack } from "@mui/material";
import { IDevices } from "../types";
import {
  DetailsButtonText,
  ObjectInfoHeading,
} from "components/sections/devices/DeviceDetailsBody/DeviceDetailsBody.styled";
import { useNavigate } from "react-router-dom";
import {
  SmallText,
  StyledAccessTimeIcon,
} from "components/cards/DeviceDetailsCard/DeviceDetailsCard.styled";
import { isEmpty, omit } from "lodash";

//
// DEVICE DETAILS PAGE HELPERS
//

const GetValueForObjectNameGenInfo = (name: string, objectId: string) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={4}
    >
      <Box>{name}</Box>
      <DetailsButtonText
        onClick={() =>
          navigate({
            pathname: `/dashboard/objects/${objectId}`,
          })
        }
      >
        Details
      </DetailsButtonText>
    </Stack>
  );
};

export const transformDeviceForGeneralInfoTable = (
  device: IDevices | null
): any => {
  if (!device) return {};

  return {
    "Device type": device.deviceType?.name,
    Account: "-",
    "Object name": GetValueForObjectNameGenInfo(
      device.object?.name || "-",
      device.object?.uniqueId
    ),
    "Device profile":
      device.deviceType?.deviceProfiles
        .map((devProf) => devProf?.profileName)
        .join(", ") || "-",
  };
};

const getValueForObjectInformation = ({
  heading,
  subitems,
  timeStamp,
}: {
  heading: string;
  subitems?: Array<any>;
  timeStamp?: string;
}) => (
  <Stack spacing={1}>
    <ObjectInfoHeading>{heading}</ObjectInfoHeading>
    {subitems &&
      subitems.map((item) => (
        <SmallText color={"#323946"}>{item.text}</SmallText>
      ))}
    {timeStamp && (
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <StyledAccessTimeIcon />
        <SmallText color={"#959EB2"}>{timeStamp}</SmallText>
      </Stack>
    )}
  </Stack>
);

export const transformDeviceForObjectInfoTable = (
  device: IDevices | null
): any => {
  if (!device) return {};

  return {
    LOCATION: getValueForObjectInformation({
      heading: device.object?.location?.locationProvider?.provider || "-",
      subitems: [{ text: `GPS Location, ± -km, - sats` }],
      timeStamp: "1h 23m ago (March 22, 2023 at 01:25)",
    }),
    NETWORK: getValueForObjectInformation({
      heading: `RSSI: - dBm    SNR: - dBm`,
      subitems: [
        { text: `Network: ${device.lastReceivedNetwork}` },
        { text: `ICCID: -` },
      ],
      timeStamp: "1h 23m ago (March 22, 2023 at 01:25)",
    }),
    "INSTALL DATE": getValueForObjectInformation({
      heading: `-`,
      timeStamp: "1h 23m ago (March 22, 2023 at 01:25)",
    }),
    SUBSCRIPTION: getValueForObjectInformation({
      heading: `-`,
      subitems: [
        { text: `Contract duration: - months` },
        { text: `Plan price: -` },
      ],
    }),
  };
};

//
// DEVICE SETTINGS PAGE HELPERS
//
export const deviceDetailsFormatterForSettingsForm = (
  device: IDevices | null
) => {
  if (isEmpty(device)) return {};

  const removedUnwantedKeys = omit(device, [
    "created",
    "createdBy",
    "deleted",
    "deletedBy",
    "isDeleted",
    "lastUpdated",
    "updatedBy",
  ]);

  const formattedDevice = {
    ...removedUnwantedKeys,
  };

  return formattedDevice;
};
