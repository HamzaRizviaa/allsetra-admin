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
  transformOwnerForCompanyInformation,
  transformOwnerCountriesForWhitelisted,
} from "app/data/helpers";

export interface AlarmMetadataProps {
  data: types.IAlarm;
}

const AlarmMetadata: FC<AlarmMetadataProps> = ({ data }) => {
  const { data: alarmPersonsData } = useGetAlarmPersonsForAlarmQuery(
    data.uniqueId
  );

  const {
    objectInformation,
    alarmPersons,
    companyInformation,
    countriesWhiteListed,
  } = useMemo(() => {
    return {
      objectInformation: transformAlarmForObjectInfoTable(data),
      alarmPersons: transformAlarmPersonsForTable(alarmPersonsData ?? []),
      companyInformation: transformOwnerForCompanyInformation(data.object),
      countriesWhiteListed: transformOwnerCountriesForWhitelisted(data.object),
    };
  }, [data, alarmPersonsData]);

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
            <KeyValueTable records={companyInformation} />
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
