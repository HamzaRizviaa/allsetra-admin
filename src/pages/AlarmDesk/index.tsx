import { FC, useState, useCallback, useEffect } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import {
  Table,
  Topbar,
  useDispatchOnParams,
  types,
} from "@vilocnv/allsetra-core";
import AlarmExpendableRowCard from "components/cards/AlarmExpendableRowCard/AlarmExpendableRowCard";
import AlarmReportTheftForm from "components/forms/alarmDesk/AlarmReportTheftForm/AlarmReportTheftForm";
import ClearAlarmForm from "components/forms/alarmDesk/ClearAlarmForm/ClearAlarmForm";
import AlarmSendEmailForm from "components/forms/alarmDesk/AlarmSendEmailForm/AlarmSendEmailForm";
import AlarmSendSMSForm from "components/forms/alarmDesk/AlarmSendSMSForm/AlarmSendSMSForm";

// Data
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import { ALL_ALARMS_TABLE_COLUMNS } from "app/data/constants";
import {
  disableDeviceImmobilizerThunk,
  getAlarmsByQueryThunk,
  getLoggedInUserThunk,
  postLockAlarmThunk,
  postUnlockAlarmThunk,
  postUnlockAllAlarmsThunk,
} from "app/features";
import {
  selectAlarmDeskState,
  selectDashboardAccountId,
} from "app/data/selectors";
import AlarmDeskMap from "components/common/Map/AlarmDesk/AlarmDeskMap";

const AlarmDesk: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalRecords, loading, alarms } =
    useAppSelector(selectAlarmDeskState);
  const accountId = useAppSelector(selectDashboardAccountId);

  // Local State
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);
  const [expandedRowsId, setExpandedRowsId] = useState<string[]>([]);

  // Form Modals States
  const [openSendEmailModal, setOpenSendEmailModal] = useState<boolean>(false);
  const [openSendSMSModal, setOpenSendSMSModal] = useState<boolean>(false);
  const [openClearAlarmModal, setOpenClearAlarmModal] =
    useState<boolean>(false);
  const [openReportTheftModal, setOpenReportTheftModal] =
    useState<boolean>(false);

  useDispatchOnParams(getAlarmsByQueryThunk);

  useDispatchOnMount(getLoggedInUserThunk);

  useEffect(() => {
    const handleTabClose = (event: any) => {
      event.preventDefault();
      dispatch(postUnlockAllAlarmsThunk());
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
      dispatch(postUnlockAllAlarmsThunk());
    };
  }, []);

  const toggleSendEmailModal = () => setOpenSendEmailModal(!openSendEmailModal);

  const toggleSendSMSModal = () => setOpenSendSMSModal(!openSendSMSModal);

  const toggleClearAlarmModal = () =>
    setOpenClearAlarmModal(!openClearAlarmModal);

  const toggleReportTheftModal = () =>
    setOpenReportTheftModal(!openReportTheftModal);

  const handleGeneratePDF = () => {
    window.open("/alarm-desk/theft-report", "_blank");
  };

  const handleDisableImmobilizer = (deviceId: string) => {
    dispatch(disableDeviceImmobilizerThunk(deviceId));
  };

  // const isRowExpended = useCallback(
  //   (alarmId: string) => {
  //     return expandedRowsId.some((id) => id === alarmId);
  //   },
  //   [expandedRowsId]
  // );

  const handleExpandableRowDisabled = (row: types.IAlarm) => {
    // row.isLocked && !isRowExpended(row.uniqueId)
    // return (
    //   row.isLocked &&
    //   row.lockedBy !== localAccountId &&
    //   !isRowExpended(row.uniqueId)
    // );

    return row.isLocked && row.lockedBy !== accountId;
  };

  const onRowExpandToggled = useCallback(
    (expanded: boolean, row: types.IAlarm) => {
      setSelectedAlarmId(expanded ? row.uniqueId : null);

      const payload = { alarmId: row.uniqueId, lockedBy: accountId };

      if (expanded) {
        dispatch(postLockAlarmThunk(payload));
        setExpandedRowsId([...expandedRowsId, row.uniqueId]);
      } else {
        dispatch(postUnlockAlarmThunk(payload));

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
              handleDisableImmobilizer: handleDisableImmobilizer,
            }}
            expandableRowDisabled={handleExpandableRowDisabled}
            onRowExpandToggled={onRowExpandToggled}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <AlarmDeskMap
            center={{ lat: 52.0, lng: 5.301137 }}
            zoom={10}
            objects={alarms}
          />
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
        generatePDF={handleGeneratePDF}
      />
    </Box>
  );
};

export default AlarmDesk;
