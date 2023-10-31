import { FC } from "react";
import { Button, types } from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LockIcon from "@mui/icons-material/Lock";

export interface AlarmActionsProps {
  data: types.IAlarm;
  toggleSendEmailModal: () => void;
  toggleClearAlarmModal: () => void;
  toggleReportTheftModal: () => void;
  toggleSendSMSModal: () => void;
  handleDisableImmobilizer: (deviceId: string) => void;
}

const AlarmActions: FC<AlarmActionsProps> = ({
  data,
  toggleSendEmailModal,
  toggleClearAlarmModal,
  toggleReportTheftModal,
  toggleSendSMSModal,
  handleDisableImmobilizer,
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
          onHoverBgColor={"#CC1010"}
        >
          Report Theft
        </Button>
        {data.hasImmobilizer && (
          <Button
            variant={"contained"}
            color={"error"}
            size={"small"}
            startIcon={<LockIcon />}
            onClick={() =>
              handleDisableImmobilizer(data.device?.uniqueId || "")
            }
            onHoverBgColor={"#CC1010"}
          >
            Disable Immobilizer
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default AlarmActions;
