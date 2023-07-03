import { FC } from "react";
import { Button, Table } from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  AlarmCardContainer,
  CommnetsBox,
} from "./AlarmExpendableRowCard.styled";

// DATA
import { useAppDispatch } from "hooks";
import { IAlarm } from "app/data/types";
import { ALARM_COMMENTS_TABLE_COLUMNS } from "app/data/constants";
import { deleteCommentFromAlarmThunk } from "app/features";

export interface AlarmExpendableRowCardProps {
  data: IAlarm;
  toggleSendEmailModal: () => void;
  toggleClearAlarmModal: () => void;
  toggleReportTheftModal: () => void;
  toggleSendSMSModal: () => void;
}

const AlarmExpendableRowCard: FC<AlarmExpendableRowCardProps> = ({
  data,
  toggleSendEmailModal,
  toggleClearAlarmModal,
  toggleReportTheftModal,
  toggleSendSMSModal,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteCommnet = (row: any) => {
    dispatch(
      deleteCommentFromAlarmThunk({
        alarmId: data.uniqueId,
        commentId: row.uniqueId,
      })
    );
  };

  return (
    <AlarmCardContainer>
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
      <CommnetsBox>
        <Table
          title="Comments"
          columns={ALARM_COMMENTS_TABLE_COLUMNS}
          data={data?.comments || []}
          cellActions={[
            {
              name: "Delete comment",
              onClick: handleDeleteCommnet,
            },
          ]}
        />
      </CommnetsBox>
    </AlarmCardContainer>
  );
};

export default AlarmExpendableRowCard;
