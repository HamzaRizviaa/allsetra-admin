import { FC, useCallback } from "react";
import { isEmpty } from "lodash";
import { FieldArrayRenderProps } from "formik";
import { Stack, Typography, useTheme } from "@mui/material";
import { FormikSelectField } from "@vilocnv/allsetra-core";

interface Props extends FieldArrayRenderProps {
  deviceTypes: Array<any>;
}

const SelectedDeviceTypes: FC<Props> = ({ form, deviceTypes }) => {
  const theme = useTheme();

  const getDeviceNameById = useCallback(
    (id: string) =>
      deviceTypes.find((item) => item.uniqueId === id)?.name || "",
    [deviceTypes]
  );

  const getAvailableDeviceModulesById = (id: string) => {
    const deviceProfiles =
      deviceTypes.find((item) => item.uniqueId === id)?.deviceProfiles || [];

    return deviceProfiles;
  };

  return (
    <Stack spacing={1}>
      {form.values.deviceTypes.map((deviceTypeId: string) => (
        <Stack spacing={1} key={deviceTypeId}>
          <Typography
            fontSize={12}
            color={theme.palette.primary.main}
          ></Typography>
          <FormikSelectField
            label={`${getDeviceNameById(deviceTypeId)} profile`}
            name={`deviceProfiles[${deviceTypeId}].defaultProfileId`}
            options={getAvailableDeviceModulesById(deviceTypeId)}
            optionLabelKey="profileName"
            optionValueKey="uniqueId"
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default SelectedDeviceTypes;
