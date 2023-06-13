import { FC, useEffect } from "react";
import { Stack } from "@mui/material";
import {
  FormikCheckbox,
  FormikInputField,
  FormikSelectField,
} from "@vilocnv/allsetra-core";
import { useAppDispatch } from "hooks";
import { resetSpecificField } from "app/features";

interface Props {
  fieldTypes: Array<any>;
}

const InnerForm: FC<Props> = ({ fieldTypes }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSpecificField());
    };
  }, []);

  return (
    <Stack spacing={2}>
      <FormikInputField name="label" label={"Field label"} required />
      <FormikSelectField
        name="fieldType"
        label="Field type"
        options={fieldTypes}
        optionLabelKey="name"
        optionValueKey="id"
        required
      />
      <FormikInputField
        name="maxLength"
        label={"Max length"}
        required
        type="number"
      />
      <FormikCheckbox name="isRequired" label="Field is required" />
      <FormikCheckbox name="onlyNumbers" label="Only numbers" />
    </Stack>
  );
};

export default InnerForm;
