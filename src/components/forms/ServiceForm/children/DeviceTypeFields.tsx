import { FC } from "react";
import { FieldArrayRenderProps } from "formik";
import { Stack } from "@mui/material";
import { FormikSelectField } from "@vilocnv/allsetra-core";

interface Props extends FieldArrayRenderProps {
  deviceTypesLoading: boolean;
  deviceTypes: Array<any>;
}

const DeviceTypeFields: FC<Props> = ({ deviceTypesLoading, deviceTypes }) => {
  return (
    <Stack>
      <FormikSelectField
        label="Device type"
        name="deviceTypes.deviceTypeId"
        options={deviceTypes}
        optionLabelKey="deviceName"
        optionValueKey="uniqueId"
        loading={deviceTypesLoading}
        multiple
        required
      />
    </Stack>
  );
};

export default DeviceTypeFields;
