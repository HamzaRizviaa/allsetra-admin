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
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import SquareIcon from "@mui/icons-material/Square";
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
      <Box>{name ?? "N/A"}</Box>
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
    "Device type": device.deviceType?.name ?? "N/A",
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

export const getTimeDifference = (lastUpdated: string) => {
  const lastUpdatedDate = new Date(lastUpdated);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - lastUpdatedDate.getTime();

  const seconds = Math.floor(timeDifference / 1000) % 60;
  const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const monthsDiff =
    (currentTime.getFullYear() - lastUpdatedDate.getFullYear()) * 12 +
    (currentTime.getMonth() - lastUpdatedDate.getMonth());

  return { seconds, minutes, hours, days, months: monthsDiff };
};

export const transformDeviceForObjectInfoTable = (
  device: any | null,
  objectSubscriptions: Array<any>
): any => {
  if (!device) return {};
  const { days, months } = getTimeDifference(device.installationDate);
  const currency: any = {
    1: "$",
    0: "€",
  };

  return {
    LOCATION: getValueForObjectInformation({
      heading: device.location?.resolvedAddress || "-",
      subitems: [
        {
          text: `GPS Location, ± ${
            device.location?.accuracy || "-"
          } km, - sats`,
        },
      ],
      timeStamp: device.location?.date
        ? moment(device.location?.date).format("LLL")
        : "N/A",
    }),
    NETWORK: getValueForObjectInformation({
      heading: `RSSI: - dBm    SNR: - dBm`,
      subitems: [
        { text: `Network: ${device.lastReceivedNetwork ?? "-"}` },
        { text: `ICCID: -` },
      ],
      timeStamp: "N/A",
    }),
    "INSTALL DATE": getValueForObjectInformation({
      heading: device?.installationDate
        ? `${(days > 30 ? `${months} months` : `${days} days`) || "-"} ago`
        : "-",
      timeStamp: device?.installationDate
        ? moment(device?.installationDate).format("LLL")
        : "N/A",
    }),
    SUBSCRIPTION: objectSubscriptions.length
      ? objectSubscriptions.map((subscription: any) => {
          const { days, months } = getTimeDifference(
            subscription.invoicingEndDate
          );

          return getValueForObjectInformation({
            heading: subscription?.invoicingEndDate
              ? `${
                  (days > 30 ? `${months} months` : `${days} days`) || "-"
                } ago`
              : "-",
            subitems: [
              {
                text: `Contract duration: ${
                  subscription.subscription?.contractTerm > -1
                    ? subscription.subscription.contractTerm + 1 * 12
                    : "-"
                } months`,
              },
              {
                text: `Plan price: ${
                  subscription.subscription?.currency > -1
                    ? currency[subscription.subscription.currency]
                    : ""
                }${
                  subscription.subscription?.valuePerMonth > -1
                    ? subscription.subscription.valuePerMonth
                    : "-"
                } `,
              },
            ],
          });
        })
      : "No Subscriptions available",
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

//
// DEVICE LOCATION HISTORY PAGE HELPERS
//

export const timelineItems = [
  {
    title: "Lageweg 5a, 7056 CA, Netherlands",
    dateAndTime: "21:50:53, 16/09/2022",
    location: "51.8926, 4.37519",
    timelineDotDetails: "28",
    color: "#1CA0BD",
    height: "130px",
  },
  {
    title: "Lageweg 5a, 7056 CA, Netherlands",
    dateAndTime: "21:50:53, 16/09/2022",
    location: "51.8926, 4.37519",
    timelineDotDetails: "28",
    color: "#4560E4",
    height: "130px",
  },
  {
    title: "Lageweg 5a, 7056 CA, Netherlands",
    dateAndTime: "21:50:53, 16/09/2022",
    location: "51.8926, 4.37519",
    timelineDotDetails: "28",
    color: "#3E34C1",
    height: "130px",
  },
  {
    title: "Lageweg 5a, 7056 CA, Netherlands",
    dateAndTime: "21:50:53, 16/09/2022",
    location: "51.8926, 4.37519",
    timelineDotDetails: "28",
    color: "#6E44A8",
    height: "130px",
  },
  {
    title: "Lageweg 5a, 7056 CA, Netherlands",
    dateAndTime: "21:50:53, 16/09/2022",
    location: "51.8926, 4.37519",
    timelineDotDetails: "28",
    color: "#BC3FB7",
    height: "130px",
  },
];

export const objectRideItems = [
  {
    title: "Start of the ride",
    address: "Lageweg 2a, 7047 CA Braamt, Netherlands",
    timelineDotDetails: <LocationOnIcon />,
    color: "#1CA0BD",
    height: "90px",
  },
  {
    title: "Moving",
    address: "Lageweg 2a, 7047 CA Braamt, Netherlands",
    timelineDotDetails: <NearMeRoundedIcon />,
    color: "#4560E4",
    height: "90px",
  },
  {
    title: "Stopped",
    address: "Lageweg 2a, 7047 CA Braamt, Netherlands",
    timelineDotDetails: <SquareIcon />,
    color: "red",
    height: "90px",
  },
  {
    title: "Moving",
    address: "Lageweg 2a, 7047 CA Braamt, Netherlands",
    timelineDotDetails: <NearMeRoundedIcon />,
    color: "#6E44A8",
    height: "90px",
  },
  {
    title: "End of the ride",
    address: "Lageweg 2a, 7047 CA Braamt, Netherlands",
    timelineDotDetails: <LocationOnIcon />,
    color: "#BC3FB7",
    height: "90px",
  },
];
