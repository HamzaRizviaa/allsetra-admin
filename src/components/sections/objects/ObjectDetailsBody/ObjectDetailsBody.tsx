import { FC, useMemo } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { KeyValueTable, types } from "@vilocnv/allsetra-core";
import AttachedDevicesGrid from "./children/AttachedDevicesGrid";
import ObjectDetailsMap from "./children/ObjectDetailsMap";

// DATA
import {
  transformObjectForObjectInfoTable,
  transformObjectForAlarmConfigTable,
} from "app/data/helpers";

interface Props {
  activeObject: types.IObject | null;
}

const ObjectDetailsBody: FC<Props> = ({ activeObject }) => {
  const { objectInformation, alarmConfiguration } = useMemo(() => {
    return {
      objectInformation: transformObjectForObjectInfoTable(activeObject),
      alarmConfiguration: transformObjectForAlarmConfigTable(activeObject),
    };
  }, [activeObject]);

  return (
    <Box mt={4}>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <AttachedDevicesGrid devices={activeObject?.devices || []} />
          <Stack mt={4} spacing={4}>
            <KeyValueTable
              title="Object Information"
              records={objectInformation}
            />
            {/* <KeyValueTable title="Object Dynamic Fields" records={{}} /> */}
            {/* <KeyValueTable title="Installation Information" records={{}} /> */}
            <KeyValueTable
              title="Alarm Configuration"
              records={alarmConfiguration}
            />
            {/* <KeyValueTable title="Working Hours" records={{}} /> */}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={5} gap={2}>
          <ObjectDetailsMap activeObject={activeObject} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ObjectDetailsBody;
