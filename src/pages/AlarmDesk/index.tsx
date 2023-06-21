import { FC } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";
import AlarmExpendableRowCard from "components/cards/AlarmExpendableRowCard/AlarmExpendableRowCard";

// Data
import { ALL_ALARMS_TABLE_COLUMNS } from "app/data/constants";
import { getAlarmsByQueryThunk } from "app/features";
import { useAppSelector } from "hooks";
import { selectAlarmDeskState } from "app/data/selectors";

const AlarmDesk: FC = () => {
  const theme = useTheme();

  const { totalRecords, loading, alarms } =
    useAppSelector(selectAlarmDeskState);

  useDispatchOnParams(getAlarmsByQueryThunk);

  return (
    <Box>
      <Topbar theme={theme} title="Alarm desk" />
      <Grid container mx={4}>
        <Grid item xs={12} lg={7}>
          <Table
            columns={ALL_ALARMS_TABLE_COLUMNS}
            data={alarms}
            progressPending={loading}
            paginationTotalRows={totalRecords}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={AlarmExpendableRowCard}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <p>MAP</p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlarmDesk;
