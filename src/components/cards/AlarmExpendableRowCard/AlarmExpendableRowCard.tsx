import { FC } from "react";
import { Button } from "@vilocnv/allsetra-core";
import { Box, Stack } from "@mui/material";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { AlarmCardContainer } from "./AlarmExpendableRowCard.styled";

export interface AlarmExpendableRowCardProps {
  data: any;
}

const AlarmExpendableRowCard: FC<AlarmExpendableRowCardProps> = (props) => {
  console.log({ props });

  return (
    <AlarmCardContainer>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <Button variant={"outlined"} size={"small"}>
            Email
          </Button>
          <Button variant={"outlined"} size={"small"}>
            SMS
          </Button>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <Button
            variant={"contained"}
            size={"small"}
            startIcon={<NotificationsOffIcon />}
          >
            Clear Alarm
          </Button>
          <Button
            variant={"outlined"}
            color={"error"}
            size={"small"}
            startIcon={<ReportProblemIcon />}
          >
            Report Theft
          </Button>
        </Stack>
      </Stack>
    </AlarmCardContainer>
  );
};

export default AlarmExpendableRowCard;
