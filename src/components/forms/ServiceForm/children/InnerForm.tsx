import { FC, useEffect } from "react";
import { Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { FieldArray, useFormikContext } from "formik";
import DeviceTypeFields from "./DeviceTypeFields";

import { useAppDispatch, useAppSelector } from "hooks";
import { selectDeviceTypesState } from "app/data/selectors";
import { getAllDeviceTypesThunk } from "app/features";
import { IAddService } from "app/data/types";

const InnerForm: FC = () => {
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<IAddService>();

  const { loading: deviceTypesLoading, deviceTypes } = useAppSelector(
    selectDeviceTypesState
  );

  useEffect(() => {
    dispatch(getAllDeviceTypesThunk());
  }, []);

  console.log({ values });

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
        optionLabelKey="deviceName"
        optionValueKey="uniqueId"
        loading={deviceTypesLoading}
        onChange={(value) => {
          console.log(value);
        }}
        multiple
        required
      />
      {/* <FieldArray
        name="deviceTypes"
        render={(props) => <DeviceTypeFields {...props} />}
      /> */}
    </Stack>
  );
};

export default InnerForm;
