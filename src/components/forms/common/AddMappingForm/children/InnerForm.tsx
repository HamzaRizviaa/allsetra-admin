import { ChangeEvent, FC } from "react";
import { Stack, Typography } from "@mui/material";
import { FormikInputField, FormikSelectField } from "@vilocnv/allsetra-core";
import { useAppDispatch } from "hooks";
import { getDeviceTypesProfileIdentifiers } from "app/features";

interface Props {
  dataPoints: Array<any>;
  identifiers: Array<any>;
  triggerModes: Array<any>;
  deviceTypeId?: string | null;
  identifierLoading: boolean | undefined;
}

const InnerForm: FC<Props> = ({
  dataPoints,
  identifiers,
  triggerModes,
  deviceTypeId,
  identifierLoading,
}) => {
  const dispatch = useAppDispatch();

  const handleDataPointChange = (e: ChangeEvent<{ value: unknown }>) => {
    dispatch(
      getDeviceTypesProfileIdentifiers({
        deviceTypeId,
        fieldId: e,
      })
    );
  };

  return (
    <Stack spacing={2}>
      <FormikSelectField
        label="Select Data Point"
        name="dataPointId"
        onChange={handleDataPointChange}
        options={dataPoints}
        optionLabelKey={"label"}
        optionValueKey={"id"}
        required
      />

      <FormikSelectField
        label="Select Identifier"
        name="identifierId"
        options={identifiers}
        optionLabelKey={"name"}
        optionValueKey={"id"}
        required
        loading={identifierLoading}
      />

      <FormikSelectField
        label="Trigger Mode"
        name="triggerMode"
        options={triggerModes}
        optionLabelKey={"name"}
        optionValueKey={"id"}
        required
      />

      <FormikSelectField
        label="Inverted (if value is boolean)"
        name="isInverted"
        options={[
          { id: true, value: "Yes" },
          { id: false, value: "No" },
        ]}
        optionLabelKey={"value"}
        optionValueKey={"id"}
        required
      />

      <Typography variant={"h6"}>Dynamic fields</Typography>
      <FormikInputField
        label="Operating Time Voltage Threshold"
        name="dynamicFields"
        required
        fullWidth
      />
    </Stack>
  );
};

export default InnerForm;
