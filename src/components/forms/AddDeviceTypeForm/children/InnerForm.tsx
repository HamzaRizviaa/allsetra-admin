import { FC } from "react";
import { Stack } from "@mui/material";
import FormikInputField from "@vilocnv/allsetra-core";
import FormikSelectField from "@vilocnv/allsetra-core";

interface Props {
  objectTypeIcons: Array<any>;
  supportedDeviceTypes: Array<any>;
}

const InnerForm: FC<Props> = ({ objectTypeIcons, supportedDeviceTypes }) => {
  return (
    <Stack spacing={2}>
      <FormikInputField label="Object name" name="objectName" />
      <FormikSelectField
        label="Object type icon"
        name="objectTypeIcon"
        options={objectTypeIcons}
      />
      <FormikSelectField
        label="Supported device types"
        name="supportedDeviceTypes"
        options={supportedDeviceTypes}
        searchable
      />
    </Stack>
  );
};

export default InnerForm;
