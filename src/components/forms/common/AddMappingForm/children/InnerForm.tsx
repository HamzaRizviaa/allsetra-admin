import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { FormikSelectField } from "@vilocnv/allsetra-core";

interface Props {
  dataPoints: Array<any>;
  identifiers: Array<any>;
  triggerModes: Array<any>;
  voltageThresholds: Array<any>;
}

const InnerForm: FC<Props> = ({
  dataPoints,
  identifiers,
  triggerModes,
  voltageThresholds,
}) => {
  return (
    <Stack spacing={2}>
      <FormikSelectField
        label="Select Data Point"
        name="dataPoint"
        options={dataPoints}
        optionLabelKey={"value"}
        optionValueKey={"value"}
        required
      />

      <FormikSelectField
        label="Select Identifier"
        name="identifier"
        options={identifiers}
        optionLabelKey={"value"}
        optionValueKey={"value"}
        required
      />

      <FormikSelectField
        label="Trigger Mode"
        name="triggerMode"
        options={triggerModes}
        optionLabelKey={"value"}
        optionValueKey={"value"}
        required
      />

      <FormikSelectField
        label="Inverted (if value is boolean)"
        name="inverted"
        options={[
          { key: 1, value: "Yes" },
          { key: 2, value: "No" },
        ]}
        optionLabelKey={"value"}
        optionValueKey={"value"}
        required
      />

      <Typography variant={"h6"}>Dynamic fields</Typography>
      <FormikSelectField
        label="Operating Time Voltage Threshold"
        name="voltageThreshold"
        options={voltageThresholds}
        optionLabelKey={"value"}
        optionValueKey={"value"}
        required
      />
    </Stack>
  );
};

export default InnerForm;
