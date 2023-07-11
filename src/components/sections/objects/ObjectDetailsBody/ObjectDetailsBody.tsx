import { FC, useMemo } from "react";
import { isEmpty } from "lodash";
import { Box, Grid, Stack } from "@mui/material";
import { KeyValueTable, types } from "@vilocnv/allsetra-core";
import AttachedDevicesGrid from "./children/AttachedDevicesGrid";
import ObjectDetailsMap from "./children/ObjectDetailsMap";

// DATA
import {
  transformObjectForObjectInfoTable,
  transformObjectForAlarmConfigTable,
  transformObjectMetaDataForDynamicFields,
} from "app/data/helpers";

interface Props {
  activeObject: types.IObject | null;
}

const ObjectDetailsBody: FC<Props> = ({ activeObject }) => {
  const { objectInformation, alarmConfiguration, dynamicFields } =
    useMemo(() => {
      return {
        objectInformation: transformObjectForObjectInfoTable(activeObject),
        alarmConfiguration: transformObjectForAlarmConfigTable(activeObject),
        dynamicFields: transformObjectMetaDataForDynamicFields(activeObject),
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
            {!isEmpty(dynamicFields) && (
              <KeyValueTable
                title="Object Dynamic Fields"
                records={dynamicFields}
              />
            )}
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
