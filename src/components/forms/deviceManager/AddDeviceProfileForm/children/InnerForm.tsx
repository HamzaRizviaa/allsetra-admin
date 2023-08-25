import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import {
  Button,
  FormikInputField,
  FormikSelectField,
  FormikToggleField,
  Table,
} from "@vilocnv/allsetra-core";

//Data
import { DEVICEIOMAPPING__TABLE_COLUMNS } from "app/data/constants";

interface Props {}

const InnerForm: FC<Props> = ({}) => {
  return (
    <Stack spacing={2}>
      <FormikInputField
        name="profileName"
        label={"Profile Name"}
        required
        placeholder="Profile Name"
      />
      <FormikInputField
        name="description"
        label={"Description"}
        required
        multiline
        rows={3}
        placeholder="Enter description"
      />

      <Typography variant={"h6"}>Profile configuration</Typography>
      <FormikToggleField
        label="Use Driver authentication"
        name="authentication"
      />
      <FormikToggleField
        label="Use accelerometer for ignition"
        name="ignition"
      />
      <FormikToggleField label="Enable Canbus listening" name="listening" />
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
      />

      <Typography variant={"h6"}>Input to Output configuration</Typography>
      <FormikToggleField label="Enable Input to output" name="enableIO" />
      <FormikSelectField
        label="Input Pin"
        name="inputPin"
        options={[{ key: 1, value: "Analog input 1" }]}
        optionLabelKey={"value"}
        optionValueKey={"value"}
      />
      <FormikSelectField
        label="Output Pin"
        name="outputPin"
        options={[{ key: 1, value: "Std Immobilizer" }]}
        optionLabelKey={"value"}
        optionValueKey={"value"}
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
      />

      <Typography variant={"h6"}>Device I/O Mapping</Typography>
      <Table
        columns={DEVICEIOMAPPING__TABLE_COLUMNS}
        data={[
          { dataPoint: "Internal Battery Voltage" },
          { dataPoint: "External Battery Voltage" },
          { dataPoint: "Body Temperature" },
          { dataPoint: "Operating Time" },
        ]}
      />
      <Button
        variant={"outlined"}
        size={"medium"}
        onClick={() => {}}
        sx={{ width: "45%" }}
      >
        Add Mapping
      </Button>
    </Stack>
  );
};

export default InnerForm;
