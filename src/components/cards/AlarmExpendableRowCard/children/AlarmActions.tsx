import { FC } from "react";
import { Button } from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export interface AlarmActionsProps {
  toggleSendEmailModal: () => void;
  toggleClearAlarmModal: () => void;
  toggleReportTheftModal: () => void;
  toggleSendSMSModal: () => void;
}

const AlarmActions: FC<AlarmActionsProps> = ({
  toggleSendEmailModal,
  toggleClearAlarmModal,
  toggleReportTheftModal,
  toggleSendSMSModal,
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={2}>
        <Button
          variant={"outlined"}
          size={"small"}
          onClick={toggleSendEmailModal}
        >
          Email
        </Button>
        <Button
          variant={"outlined"}
          size={"small"}
          onClick={toggleSendSMSModal}
        >
          SMS
        </Button>
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <Button
          variant={"contained"}
          size={"small"}
          startIcon={<NotificationsOffIcon />}
          onClick={toggleClearAlarmModal}
        >
          Clear Alarm
        </Button>
        <Button
          variant={"outlined"}
          color={"error"}
          size={"small"}
          startIcon={<ReportProblemIcon />}
          onClick={toggleReportTheftModal}
        >
          Report Theft
        </Button>
      </Stack>
    </Stack>
  );
};

export default AlarmActions;
