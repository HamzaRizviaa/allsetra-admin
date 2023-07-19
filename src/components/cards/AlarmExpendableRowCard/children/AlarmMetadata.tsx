import { FC, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import {
  DataCardAccordionLayout,
  KeyValueTable,
  types,
} from "@vilocnv/allsetra-core";

// DATA
import { useGetAlarmPersonsForAlarmQuery } from "app/features";
import {
  transformAlarmForObjectInfoTable,
  transformAlarmPersonsForTable,
  transformOwnerCountriesForWhitelisted,
} from "app/data/helpers";

export interface AlarmMetadataProps {
  data: types.IAlarm;
}

const AlarmMetadata: FC<AlarmMetadataProps> = ({ data }) => {
  const { data: alarmPersonsData, isLoading: alarmPersonsLoading } =
    useGetAlarmPersonsForAlarmQuery(data.uniqueId);

  const { objectInformation, alarmPersons, countriesWhiteListed } =
    useMemo(() => {
      return {
        objectInformation: transformAlarmForObjectInfoTable(data),
        alarmPersons: transformAlarmPersonsForTable(alarmPersonsData ?? []),
        countriesWhiteListed: transformOwnerCountriesForWhitelisted(
          data.object
        ),
      };
    }, [data, alarmPersonsData]);

  console.log({ alarmPersonsData });

  return (
    <Box my={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DataCardAccordionLayout title="Object Information">
            {/* @ts-ignore */}
            <KeyValueTable records={objectInformation} />
          </DataCardAccordionLayout>
        </Grid>
        <Grid item xs={12} md={6}>
          <DataCardAccordionLayout title="Alarm Persons">
            <KeyValueTable records={alarmPersons} />
          </DataCardAccordionLayout>
        </Grid>
        <Grid item xs={12} md={6}>
          <DataCardAccordionLayout title="Company Information">
            <div></div>
          </DataCardAccordionLayout>
        </Grid>
        <Grid item xs={12} md={6}>
          <DataCardAccordionLayout title="Country Whitelist">
            <KeyValueTable records={countriesWhiteListed} />
          </DataCardAccordionLayout>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlarmMetadata;
