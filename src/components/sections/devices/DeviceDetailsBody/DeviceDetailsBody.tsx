import { FC } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { KeyValueTable } from "@vilocnv/allsetra-core";
import DeviceDetailsCard from "components/cards/DeviceDetailsCard/DeviceDetailsCard";

// DATA
import { IDevices } from "app/data/types";
import {
  transformDeviceForGeneralInfoTable,
  transformDeviceForObjectInfoTable,
} from "app/data/helpers/devicesHelpers";
import DeviceDetailsMap from "./children/DeviceDetailsMap";

interface Props {
  specificDevice: IDevices | null;
  objectSubscriptions: Array<any>;
}

const DeviceDetailsBody: FC<Props> = ({
  specificDevice,
  objectSubscriptions,
}) => {
  // const { generalInformation, objectInformation } = useMemo(() => {
  //   return {
  //     generalInformation: transformDeviceForGeneralInfoTable(specificDevice),
  //     objectInformation: transformDeviceForObjectInfoTable(
  //       specificDevice,
  //       objectSubscriptions
  //     ),
  //   };
  // }, [specificDevice]);

  const generalInformation = transformDeviceForGeneralInfoTable(specificDevice);
  const objectInformation = transformDeviceForObjectInfoTable(
    specificDevice,
    objectSubscriptions
  );

  return (
    <Box mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Stack spacing={5}>
            <DeviceDetailsCard device={specificDevice} />

            <KeyValueTable
              title="General Information"
              records={generalInformation}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <KeyValueTable
            title="Device Information"
            records={objectInformation}
          />
        </Grid>

        <Grid item xs={12}>
          <DeviceDetailsMap specificDevice={specificDevice} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceDetailsBody;
