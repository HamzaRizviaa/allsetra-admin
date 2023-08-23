import { FC } from "react";
import {
  FormikDropzone,
  FormikInputField,
  FormikSelectField,
} from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { selectAllCurrencies } from "app/data/selectors";
import { useAppSelector } from "hooks";
import {
  DeviceTypeDetailContainer,
  DeviceTypeHeading,
} from "./DeviceTypesDetailsSection.styled";

const DeviceTypesDetailsSection: FC = () => {
  const currencies = useAppSelector(selectAllCurrencies);

  return (
    <Stack spacing={3}>
      <DeviceTypeHeading>Device name:</DeviceTypeHeading>
      <DeviceTypeDetailContainer>
        <FormikInputField
          name="name"
          placeholder="Device name"
          disabled
          fullWidth
        />
      </DeviceTypeDetailContainer>

      <DeviceTypeHeading>Device picture:</DeviceTypeHeading>
      <FormikDropzone name="devicePicture" fieldTitle="" />

      <DeviceTypeHeading>Device price:</DeviceTypeHeading>
      <DeviceTypeDetailContainer>
        <FormikSelectField
          label=""
          name="currency"
          options={currencies}
          optionLabelKey="name"
          optionValueKey="id"
          sx={{ width: "30%" }}
        />
        <FormikInputField name="price" placeholder="Device price" />
      </DeviceTypeDetailContainer>
    </Stack>
  );
};

export default DeviceTypesDetailsSection;
