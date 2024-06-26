import { FC } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikToggleField,
} from "@vilocnv/allsetra-core";
import { Stack, Typography } from "@mui/material";
import { ChildFormBox } from "./AlarmConfigurationFormSection.styled";

const AlarmConfigurationFormSection: FC = () => {
  return (
    <ContentSectionLayout
      title="Alarm configuration"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <TwoColsLayout hideDivider>
          <Stack spacing={2}>
            <Typography>Outside of working house alarms:</Typography>
            <FormikToggleField
              label="Movement"
              name="alarmsConfiguration.Movement"
            />
            <FormikToggleField
              label="External voltage high"
              name="alarmsConfiguration.ExternalVoltageHigh"
            />
            <FormikToggleField
              label="Battery disconnected"
              name="alarmsConfiguration.BatteryDisconnected"
            />
            <FormikToggleField
              label="Ignition on"
              name="alarmsConfiguration.IgnitionOn"
            />
          </Stack>
          <Stack spacing={2}>
            <Typography>Always alarms:</Typography>
            <FormikToggleField
              label="Land border crossing"
              name="alarmsConfiguration.LandBorderCrossing"
            />
            <FormikToggleField
              label="Car alarm"
              name="alarmsConfiguration.CarAlarm"
            />
            <FormikToggleField
              label="Away alarm"
              name="alarmsConfiguration.AwayAlarm"
            />
            <FormikToggleField
              label="Panic button pressed"
              name="alarmsConfiguration.PanicButtonPressed"
            />
          </Stack>
        </TwoColsLayout>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default AlarmConfigurationFormSection;
