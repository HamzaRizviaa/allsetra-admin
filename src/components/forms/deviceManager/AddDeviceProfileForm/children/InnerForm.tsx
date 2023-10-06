import { FC, useMemo } from "react";
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
import { useFormikContext } from "formik";
import { IAddDeviceProfileType } from "app/data/types";

interface Props {
  setOpenMappingModal: React.Dispatch<React.SetStateAction<boolean>>;
  triggerModes: Array<any>;
  environments: Array<any>;
  inputPins: Array<any>;
  outputPins: Array<any>;
  dataPoints: Array<any>;
  allIdentifiers: Array<any>;
}

const InnerForm: FC<Props> = ({
  setOpenMappingModal,
  triggerModes,
  environments,
  inputPins,
  outputPins,
  dataPoints,
  allIdentifiers,
}) => {
  const { values } = useFormikContext<IAddDeviceProfileType>();

  const deviceIOColumns = useMemo(
    () =>
      DEVICEIOMAPPING__TABLE_COLUMNS(dataPoints, allIdentifiers, triggerModes),
    [dataPoints, allIdentifiers, triggerModes]
  );

  return (
    <Stack spacing={2}>
      <FormikInputField
        name="name"
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
        name="useDriverAuthentication"
      />
      <FormikToggleField
        label="Use accelerometer for ignition"
        name="useAccelerometerForIgnition"
      />
      <FormikToggleField
        label="Enable Canbus listening"
        name="enableCanbusListening"
      />
      <FormikSelectField
        label="Unit Report Interval"
        name="reportIntervalInSeconds"
        options={[
          { id: 30, value: "30 seconds" },
          { id: 60, value: "60 seconds" },
          { id: 120, value: "120 seconds" },
        ]}
        optionLabelKey={"value"}
        optionValueKey={"id"}
      />
      <FormikSelectField
        label="Environment"
        name="environment"
        options={environments}
        optionLabelKey={"name"}
        optionValueKey={"id"}
      />

      <Typography variant={"h6"}>Input to Output configuration</Typography>
      <FormikToggleField
        label="Enable Input to output"
        name="enableInputToOutput"
      />
      <FormikSelectField
        label="Input Pin"
        name="inputPinId"
        options={inputPins}
        optionLabelKey={"name"}
        optionValueKey={"id"}
      />
      <FormikSelectField
        label="Output Pin"
        name="outputPinId"
        options={outputPins}
        optionLabelKey={"name"}
        optionValueKey={"id"}
      />
      <FormikSelectField
        label="Trigger mode"
        name="triggerMode"
        options={triggerModes}
        optionLabelKey={"name"}
        optionValueKey={"id"}
      />

      <Typography variant={"h6"}>Device I/O Mapping</Typography>
      <Table
        columns={deviceIOColumns}
        data={values.mappings}
        paginationTotalRows={values.mappings.length}
      />
      <Button
        variant={"outlined"}
        size={"medium"}
        onClick={() => setOpenMappingModal(true)}
        sx={{ width: "45%" }}
      >
        Add Mapping
      </Button>
    </Stack>
  );
};

export default InnerForm;
