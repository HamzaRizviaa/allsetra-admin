import { FC, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { useFormikContext } from "formik";

import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectDeviceTypesState,
  selectIconState,
  selectObjectTypesState,
} from "app/data/selectors";
import {
  getAllDeviceTypesThunk,
  getAllIconsThunk,
  getAllObjectTypesThunk,
} from "app/features";
import { IAddObjectType } from "app/data/types";

const InnerForm: FC = () => {
  const dispatch = useAppDispatch();
  const { setFieldValue, values } = useFormikContext<IAddObjectType>();

  const { loading: objectTypesLoading, allObjectTypes } = useAppSelector(
    selectObjectTypesState
  );

  const { loading: iconLoading, icons } = useAppSelector(selectIconState);

  const { loading: deviceTypesLoading, deviceTypes } = useAppSelector(
    selectDeviceTypesState
  );

  const filteredData = allObjectTypes.filter(
    (item: any) => item.uniqueId === values.parentObjectId
  );

  const supportedDevicesRender = (filteredData: any[]) => {
    return filteredData[0].services.map((val: any) => ({
      label: val.name,
      value: val.uniqueId,
    }));
  };

  const iconRender = (icons: any[]) => {
    return icons.map((icon) => ({
      label: (
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/icons/${icon.uniqueId}/file?X-Subscription=${process.env.REACT_APP_API_HEADER_SUBSCRIPTION}`}
          key={icon.uniqueId}
          alt="Icon"
          width="22.5px"
        />
      ),
      value: icon.uniqueId,
    }));
  };

  const deviceRender = (deviceTypes: any[]) => {
    return deviceTypes.map((device) => ({
      label: device.name,
      value: device.uniqueId,
    }));
  };

  console.log("HERE", deviceRender(deviceTypes));

  useEffect(() => {
    dispatch(getAllObjectTypesThunk());
    dispatch(getAllIconsThunk());
    dispatch(getAllDeviceTypesThunk());
  }, []);

  useEffect(() => {
    iconRender(icons);
  }, [icons]);

  console.log({ values });

  return (
    <Stack spacing={2}>
      <FormikInputField label="Object name" name="name" required />
      <FormikSelectField
        label="Parent object type"
        name="parentObjectId"
        options={allObjectTypes}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={objectTypesLoading}
        onChange={(value) => {
          console.log(value);
        }}
        required
      />
      <FormikSelectField
        label="Object type icon"
        name="iconId"
        options={iconRender(icons)}
        optionLabelKey="label"
        optionValueKey="value"
        loading={iconLoading}
        onChange={(value) => {
          console.log(value);
        }}
        required
      />
      <FormikSelectField
        label="Supported device types"
        name="deviceTypes"
        options={deviceRender(deviceTypes)}
        optionLabelKey="label"
        optionValueKey="value"
        loading={deviceTypesLoading}
        onChange={(value: any) => {
          const tempDeviceTypes = value.map((deviceType: any) => {
            return { deviceTypeId: deviceType };
          });
          console.log("HERERE", value);
          setFieldValue("deviceTypes", tempDeviceTypes);
        }}
        required
        multiple
      />
      <Box sx={{ height: "1px", background: "#EFF4FF" }}></Box>
      <FormikSelectField
        label="Object type icon"
        name="iconId"
        options={icons}
        optionLabelKey="url"
        optionValueKey="uniqueId"
        loading={iconLoading}
        onChange={(value) => {
          console.log(value);
        }}
        required
      />
      {values.parentObjectId !== "" ? (
        <FormikSelectField
          label="Supported services"
          name="services"
          options={supportedDevicesRender(filteredData)}
          optionLabelKey="label"
          optionValueKey="value"
          loading={iconLoading}
          onChange={(value) => {
            console.log(value);
          }}
          required
          multiple
        />
      ) : (
        ""
      )}

      {/* <FieldArray
        name="deviceTypes"
        render={(props) => <DeviceTypeFields {...props} />}
      /> */}
    </Stack>
  );
};

export default InnerForm;
