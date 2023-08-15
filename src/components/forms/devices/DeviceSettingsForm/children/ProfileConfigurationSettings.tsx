import { FC } from "react";
import {
  ContentSectionLayout,
  FormikSelectField,
  FormikToggleField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { ChildFormBox } from "components/forms/objects/ObjectSettingsForm/ObjectSettingsForm.styled";

const ProfileConfigurationSettings: FC = () => {
  return (
    <ContentSectionLayout
      title="Profile configuration"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <Stack spacing={4}>
          <FormikToggleField
            label="Use Driver authentication"
            name="driverAuthentication"
          />
          <FormikToggleField
            label="Use accelerometer for ignition"
            name="ignition"
          />
          <FormikToggleField label="Enable Canbus listening" name="cannbus" />

          <TwoColsLayout hideDivider>
            <FormikSelectField
              label="Unit Report Interval"
              name="unitReportInterval"
              options={[
                { key: 1, value: "30 seconds" },
                { key: 2, value: "60 seconds" },
                { key: 3, value: "120 seconds" },
              ]}
              optionLabelKey={"value"}
              optionValueKey={"value"}
              fullWidth
            />
            <FormikSelectField
              label="Environment"
              name="environment"
              options={[
                { key: 1, value: "Product" },
                { key: 2, value: "Develop" },
              ]}
              optionLabelKey={"value"}
              optionValueKey={"value"}
              fullWidth
            />
          </TwoColsLayout>
        </Stack>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default ProfileConfigurationSettings;
