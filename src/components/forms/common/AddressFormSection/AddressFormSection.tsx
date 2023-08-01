import { FC, Fragment } from "react";
import { Stack } from "@mui/material";
import { TwoColsLayout, FormikInputField } from "@vilocnv/allsetra-core";

interface Props {
  title: string;
  parentKey: string;
  hideDivider?: boolean;
}

const AddressFormSection: FC<Props> = ({
  title,
  parentKey,
  hideDivider = false,
}) => {
  return (
    <Fragment>
      <TwoColsLayout title={title}>
        <FormikInputField
          label="Street"
          placeholder="Street"
          name={`${parentKey}.street`}
          fullWidth
        />
        <Stack direction={"row"} spacing={2}>
          <FormikInputField
            label="House number"
            placeholder="House number"
            name={`${parentKey}.houseNumber`}
            fullWidth
          />
          <FormikInputField
            label="Extension"
            placeholder="Extension"
            name={`${parentKey}.extension`}
            fullWidth
          />
        </Stack>
        <FormikInputField
          label="Postal code"
          placeholder="Postal code"
          name={`${parentKey}.postalCode`}
          fullWidth
        />
        <FormikInputField
          label="City"
          placeholder="City"
          name={`${parentKey}.city`}
          fullWidth
        />
        <FormikInputField
          label="Country"
          placeholder="Country"
          name={`${parentKey}.country.name`}
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout hideDivider={hideDivider}>
        <FormikInputField
          label="Email"
          placeholder="Email"
          name={`${parentKey}.email`}
          fullWidth
        />
        <FormikInputField
          label="Phone number"
          placeholder="Phone number"
          name={`${parentKey}.phoneNumber`}
          fullWidth
        />
      </TwoColsLayout>
    </Fragment>
  );
};

export default AddressFormSection;
