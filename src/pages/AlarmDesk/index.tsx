import { FC, useState, useCallback, useEffect } from "react";
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
  postUnlockAllAlarmsThunk,
} from "app/features";
import { selectAlarmDeskState } from "app/data/selectors";
import { IAlarm } from "app/data/types";
import Map from "components/common/Map/Map";

const AlarmDesk: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalRecords, loading, alarms } =
    useAppSelector(selectAlarmDeskState);

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

  const toggleSendEmailModal = () => setOpenSendEmailModal(!openSendEmailModal);

  const toggleSendSMSModal = () => setOpenSendSMSModal(!openSendSMSModal);

  const toggleClearAlarmModal = () =>
    setOpenClearAlarmModal(!openClearAlarmModal);

  const toggleReportTheftModal = () =>
    setOpenReportTheftModal(!openReportTheftModal);

  const handleGeneratePDF = () => {
    window.open("/alarm-desk/theft-report", "_blank");
  };

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
          <Map
            center={{ lat: 52.0, lng: 5.301137 }}
            zoom={10}
            radius={50}
            objects={alarms}
            geozone={[{ lat: 52.150125, lng: 5.4 }]}
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
