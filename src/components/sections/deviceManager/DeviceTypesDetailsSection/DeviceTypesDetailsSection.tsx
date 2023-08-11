import { FC } from "react";
import {
  FormikDropzone,
  FormikInputField,
  FormikSelectField,
} from "@vilocnv/allsetra-core";
import { Box, Stack } from "@mui/material";
import { selectAllCurrencies } from "app/data/selectors";
import { useAppSelector } from "hooks";

const DeviceTypesDetailsSection: FC = () => {
  const currencies = useAppSelector(selectAllCurrencies);

  return (
    <Stack spacing={3}>
      <h4>Device name</h4>
      <Box width={{ xs: "90%", sm: "30vw" }}>
        <FormikInputField
          name="name"
          placeholder="Device name"
          disabled
          fullWidth
        />
      </Box>
      <h4>Device picture:</h4>
      <FormikDropzone name="devicePicture" fieldTitle="" />
      <h4>Device price:</h4>
      <Stack direction={"row"} width={{ xs: "90%", sm: "30vw" }} spacing={2}>
        <FormikSelectField
          label=""
          name="currency"
          options={currencies}
          optionLabelKey="name"
          optionValueKey="id"
          sx={{ width: "30%" }}
        />
        <FormikInputField name="price" placeholder="Device price" />
      </Stack>
    </Stack>
  );
};

export default DeviceTypesDetailsSection;
