import { FC, useMemo } from "react";
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
}

const DeviceDetailsBody: FC<Props> = ({ specificDevice }) => {
  const { generalInformation, objectInformation } = useMemo(() => {
    return {
      generalInformation: transformDeviceForGeneralInfoTable(specificDevice),
      objectInformation: transformDeviceForObjectInfoTable(specificDevice),
    };
  }, [specificDevice]);

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
            title="Object Information"
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
