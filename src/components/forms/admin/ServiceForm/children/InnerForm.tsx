import { FC, useEffect } from "react";
import { difference, isEmpty, omit } from "lodash";
import { Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { FieldArray, useFormikContext } from "formik";
import DeviceTypeFields from "./SelectedDeviceTypes";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectDeviceTypesState, selectFieldsState } from "app/data/selectors";
import { getAllDeviceTypesThunk, getAllFieldsThunk } from "app/features";
import { IAddService } from "app/data/types";

const InnerForm: FC = () => {
  const dispatch = useAppDispatch();
  const { values, setFieldValue } = useFormikContext<IAddService>();

  const { deviceTypes, loading: deviceTypesLoading } = useAppSelector(
    selectDeviceTypesState
  );
  const { allFields, loading: fieldsLoading } =
    useAppSelector(selectFieldsState);

  useEffect(() => {
    dispatch(getAllDeviceTypesThunk());
    dispatch(getAllFieldsThunk());
  }, []);

  const deviceTypeChangeHandler = (value: any) => {
    const isDeviceTypeAdded =
      value.length > values.deviceTypes.length ? true : false;

    const diffBetweenLists: string[] = isDeviceTypeAdded
      ? difference(value, values.deviceTypes)
      : difference(values.deviceTypes, value);

    // Could be the device type ID of either added or removed item
    const deviceTypeId: string =
      diffBetweenLists.length > 0 ? diffBetweenLists[0] : "";

    if (isDeviceTypeAdded && !isEmpty(deviceTypeId)) {
      setFieldValue("deviceModules", {
        ...values.deviceModules,
        [`${deviceTypeId}`]: {
          requiredModulesId: [],
          optionalModulesId: [],
        },
      });
    } else {
      setFieldValue(
        "deviceModules",
        omit(values.deviceModules, [deviceTypeId])
      );
    }

    setFieldValue("deviceTypes", value);
  };

  return (
    <Stack spacing={2}>
      <FormikInputField label="Service name" name="name" required />
      <FormikInputField
        label="Service description"
        name="description"
        multiline
        rows={3}
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
        searchable
        required
      />
      <FieldArray
        name="deviceTypes"
        render={(props) => (
          <DeviceTypeFields {...props} deviceTypes={deviceTypes} />
        )}
      />
      <FormikSelectField
        label="Dynamic fields"
        name="fields"
        options={allFields}
        optionLabelKey="label"
        optionValueKey="uniqueId"
        loading={fieldsLoading}
        multiple
        required
        searchable
      />
    </Stack>
  );
};

export default InnerForm;
