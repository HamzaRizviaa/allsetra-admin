import { FC } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikInputField,
  Button,
} from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { ChildFormBox } from "../ObjectSettingsForm.styled";

const ReminderSetting: FC = () => {
  return (
    <ContentSectionLayout
      title="Reminder"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <TwoColsLayout>
          <FormikInputField
            label="Send reminders from"
            name="remindersFrom"
            fullWidth
          />
          <FormikInputField
            label="For every"
            name="remindersForEvery"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout hideDivider>
          <FormikInputField label="Email" name="reminderEmail" fullWidth />
          <FormikInputField
            label="Reminder name"
            name="reminderName"
            fullWidth
          />
        </TwoColsLayout>
        <Stack mt={4} direction={"row"} spacing={2}>
          <Button variant={"contained"} size={"small"}>
            Set a reminder
          </Button>
          <Button variant={"text"} size={"small"}>
            Cancel
          </Button>
        </Stack>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default ReminderSetting;
