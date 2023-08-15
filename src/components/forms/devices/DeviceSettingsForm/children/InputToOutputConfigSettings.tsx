import { FC } from "react";
import {
  ContentSectionLayout,
  FormikSelectField,
  FormikToggleField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { ChildFormBox } from "components/forms/objects/ObjectSettingsForm/ObjectSettingsForm.styled";

const InputToOutputConfigSettings: FC = () => {
  return (
    <ContentSectionLayout
      title="Input to Output configuration"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <Stack spacing={4}>
          <FormikToggleField
            label="Enable Input to output"
            name="driverAuthentication"
          />

          <TwoColsLayout hideDivider>
            <FormikSelectField
              label="Input Pin"
              name="inputPin"
              options={[{ key: 1, value: "Analog input 1" }]}
              optionLabelKey={"value"}
              optionValueKey={"value"}
              fullWidth
            />
            <FormikSelectField
              label="Output Pin"
              name="outputPin"
              options={[{ key: 1, value: "Std Immobilizer" }]}
              optionLabelKey={"value"}
              optionValueKey={"value"}
              fullWidth
            />
            <FormikSelectField
              label="Trigger mode"
              name="triggerMode"
              options={[
                { key: 1, value: "Latching" },
                { key: 2, value: "Non-Latching" },
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

export default InputToOutputConfigSettings;
