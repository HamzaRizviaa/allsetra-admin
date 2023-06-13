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

  const getAvailableDeviceModulesById = (
    id: string,
    type: "required" | "optional"
  ) => {
    let availableDeviceModules = [];
    const deviceModules =
      deviceTypes.find((item) => item.uniqueId === id)?.deviceModules || [];

    if (!isEmpty(form.values.deviceModules)) {
      const selectedOtherTypeIds =
        form.values.deviceModules[id][
          type === "required" ? "optionalModulesId" : "requiredModulesId"
        ];

      availableDeviceModules = deviceModules.filter((module: any) => {
        const result = selectedOtherTypeIds.some(
          (id: string) => id === module.uniqueId
        );

        return result ? false : true;
      });
    }

    return availableDeviceModules;
  };

  return (
    <Stack spacing={1}>
      {form.values.deviceTypes.map((deviceTypeId: string) => (
        <Stack spacing={1} key={deviceTypeId}>
          <Typography fontSize={12} color={theme.palette.primary.main}>
            {getDeviceNameById(deviceTypeId)}
          </Typography>
          <FormikSelectField
            label="Required modules"
            name={`deviceModules[${deviceTypeId}].requiredModulesId`}
            options={getAvailableDeviceModulesById(deviceTypeId, "required")}
            optionLabelKey="moduleName"
            optionValueKey="uniqueId"
            multiple
          />
          <FormikSelectField
            label="Optional modules"
            name={`deviceModules[${deviceTypeId}].optionalModulesId`}
            options={getAvailableDeviceModulesById(deviceTypeId, "optional")}
            optionLabelKey="moduleName"
            optionValueKey="uniqueId"
            multiple
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default SelectedDeviceTypes;
