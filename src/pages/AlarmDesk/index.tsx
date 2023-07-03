import { FC, useState, useCallback } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";
import AlarmExpendableRowCard from "components/cards/AlarmExpendableRowCard/AlarmExpendableRowCard";
import AlarmReportTheftForm from "components/forms/alarmDesk/AlarmReportTheftForm/AlarmReportTheftForm";
import ClearAlarmForm from "components/forms/alarmDesk/ClearAlarmForm/ClearAlarmForm";
import AlarmSendEmailForm from "components/forms/alarmDesk/AlarmSendEmailForm/AlarmSendEmailForm";
import AlarmSendSMSForm from "components/forms/alarmDesk/AlarmSendSMSForm/AlarmSendSMSForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { ALL_ALARMS_TABLE_COLUMNS } from "app/data/constants";
import {
  getAlarmsByQueryThunk,
  postLockAlarmThunk,
  postUnlockAlarmThunk,
} from "app/features";
import { selectAlarmDeskState } from "app/data/selectors";
import { IAlarm } from "app/data/types";

const AlarmDesk: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalRecords, loading, alarms } =
    useAppSelector(selectAlarmDeskState);

  // Local State
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);
  const [expandedRowsId, setExpandedRowsId] = useState<string[]>([]);

  const [openSendEmailModal, setOpenSendEmailModal] = useState<boolean>(false);
  const [openSendSMSModal, setOpenSendSMSModal] = useState<boolean>(false);
  const [openClearAlarmModal, setOpenClearAlarmModal] =
    useState<boolean>(false);
  const [openReportTheftModal, setOpenReportTheftModal] =
    useState<boolean>(false);

  useDispatchOnParams(getAlarmsByQueryThunk);

  const toggleSendEmailModal = () => setOpenSendEmailModal(!openSendEmailModal);

  const toggleSendSMSModal = () => setOpenSendSMSModal(!openSendSMSModal);

  const toggleClearAlarmModal = () =>
    setOpenClearAlarmModal(!openClearAlarmModal);

  const toggleReportTheftModal = () =>
    setOpenReportTheftModal(!openReportTheftModal);

  const isRowExpended = useCallback(
    (alarmId: string) => {
      return expandedRowsId.some((id) => id === alarmId);
    },
    [expandedRowsId]
  );

  const onRowExpandToggled = useCallback(
    (expanded: boolean, row: IAlarm) => {
      setSelectedAlarmId(expanded ? row.uniqueId : null);

      if (expanded) {
        dispatch(postLockAlarmThunk(row.uniqueId));
        setExpandedRowsId([...expandedRowsId, row.uniqueId]);
      } else {
        dispatch(postUnlockAlarmThunk(row.uniqueId));

        const filteredExpandedRowsId = expandedRowsId.filter(
          (id) => id !== row.uniqueId
        );
        setExpandedRowsId(filteredExpandedRowsId);
      }
    },
    [expandedRowsId]
  );

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
              toggleSendSMSModal: toggleSendSMSModal,
            }}
            expandableRowDisabled={(row: IAlarm) =>
              row.isLocked && !isRowExpended(row.uniqueId)
            }
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
      <AlarmSendSMSForm
        open={openSendSMSModal}
        onClose={toggleSendSMSModal}
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
