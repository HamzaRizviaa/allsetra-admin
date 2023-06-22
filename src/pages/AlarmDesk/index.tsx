import { FC, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";
import AlarmExpendableRowCard from "components/cards/AlarmExpendableRowCard/AlarmExpendableRowCard";
import AlarmReportTheftForm from "components/forms/alarmDesk/AlarmReportTheftForm/AlarmReportTheftForm";
import ClearAlarmForm from "components/forms/alarmDesk/ClearAlarmForm/ClearAlarmForm";

// Data
import { useAppSelector } from "hooks";
import { ALL_ALARMS_TABLE_COLUMNS } from "app/data/constants";
import { getAlarmsByQueryThunk } from "app/features";
import { selectAlarmDeskState } from "app/data/selectors";
import { IAlarm } from "app/data/types";
import AlarmSendEmailForm from "components/forms/alarmDesk/AlarmSendEmailForm/AlarmSendEmailForm";

const AlarmDesk: FC = () => {
  const theme = useTheme();

  // Global State
  const { totalRecords, loading, alarms } =
    useAppSelector(selectAlarmDeskState);

  // Local State
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);
  const [openSendEmailModal, setOpenSendEmailModal] = useState<boolean>(false);
  const [openClearAlarmModal, setOpenClearAlarmModal] =
    useState<boolean>(false);
  const [openReportTheftModal, setOpenReportTheftModal] =
    useState<boolean>(false);

  useDispatchOnParams(getAlarmsByQueryThunk);

  const toggleSendEmailModal = () => setOpenSendEmailModal(!openSendEmailModal);

  const toggleClearAlarmModal = () =>
    setOpenClearAlarmModal(!openClearAlarmModal);

  const toggleReportTheftModal = () =>
    setOpenReportTheftModal(!openReportTheftModal);

  const onRowExpandToggled = (expanded: boolean, row: IAlarm) => {
    setSelectedAlarmId(expanded ? row.uniqueId : null);
  };

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
            expandableRowsComponentProps={{
              toggleSendEmailModal: toggleSendEmailModal,
              toggleReportTheftModal: toggleReportTheftModal,
              toggleClearAlarmModal: toggleClearAlarmModal,
            }}
            onRowExpandToggled={onRowExpandToggled}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <p>MAP</p>
        </Grid>
      </Grid>
      <AlarmSendEmailForm
        open={openSendEmailModal}
        onClose={toggleSendEmailModal}
        alarmId={selectedAlarmId}
      />
      <ClearAlarmForm
        open={openClearAlarmModal}
        onClose={toggleClearAlarmModal}
        alarmId={selectedAlarmId}
      />
      <AlarmReportTheftForm
        open={openReportTheftModal}
        onClose={toggleReportTheftModal}
        alarmId={selectedAlarmId}
      />
    </Box>
  );
};

export default AlarmDesk;
