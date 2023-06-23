import { FC, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { FieldArray, useFormikContext } from "formik";
import DeviceTypeFields from "./SelectedDeviceTypes";

import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectDeviceTypesState,
  selectFieldsState,
  selectIconState,
  selectObjectTypesState,
} from "app/data/selectors";
import {
  getAllDeviceTypesThunk,
  getAllFieldsThunk,
  getAllIconsThunk,
  getAllObjectTypesThunk,
} from "app/features";
import { IAddObjectType } from "app/data/types";
import { difference, isEmpty, omit } from "lodash";

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

  const { loading: fieldsloading, allFields } =
    useAppSelector(selectFieldsState);

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

  useEffect(() => {
    dispatch(getAllObjectTypesThunk());
    dispatch(getAllIconsThunk());
    dispatch(getAllDeviceTypesThunk());
    dispatch(getAllFieldsThunk());
  }, []);

  useEffect(() => {
    iconRender(icons);
  }, [icons]);

  const deviceTypeChangeHandler = (value: any) => {
    const isDeviceTypeAdded = value.length > values.deviceTypes.length;

    const diffBetweenLists: string[] = isDeviceTypeAdded
      ? difference(value, values.deviceTypes)
      : difference(values.deviceTypes, value);

    // Could be the device type ID of either added or removed item
    const deviceTypeId: string =
      diffBetweenLists.length > 0 ? diffBetweenLists[0] : "";

    if (isDeviceTypeAdded && !isEmpty(deviceTypeId)) {
      setFieldValue("deviceProfilesData", {
        ...values.deviceProfilesData,
        [`${deviceTypeId}`]: {
          defaultProfileId: "",
        },
      });
    } else {
      setFieldValue(
        "deviceModules",
        omit(values.deviceProfilesData, [deviceTypeId])
      );
    }

    setFieldValue("deviceTypes", value);
  };

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
        required
      />
      <FormikSelectField
        label="Object type icon"
        name="iconId"
        options={iconRender(icons)}
        optionLabelKey="label"
        optionValueKey="value"
        loading={iconLoading}
        required
      />
      <FormikSelectField
        label="Device type"
        name="deviceTypes"
        options={deviceTypes}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={deviceTypesLoading}
        onChange={deviceTypeChangeHandler}
        multiple
        required
      />
      <FieldArray
        name="deviceTypes"
        render={(props) => (
          <DeviceTypeFields {...props} deviceTypes={deviceTypes} />
        )}
      />
      <Box sx={{ height: "1px", background: "#EFF4FF" }}></Box>
      {values.parentObjectId !== "" ? (
        <FormikSelectField
          label="Supported services"
          name="services"
          options={supportedDevicesRender(filteredData)}
          optionLabelKey="label"
          optionValueKey="value"
          loading={iconLoading}
          required
          multiple
        />
      ) : (
        ""
      )}
      <FormikSelectField
        label="Dynamic Fields"
        name="fields"
        options={allFields}
        optionLabelKey="label"
        optionValueKey="uniqueId"
        loading={fieldsloading}
        onChange={(value) => {
          console.log(value);
        }}
        required
        multiple
      />
    </Stack>
  );
};

export default InnerForm;
