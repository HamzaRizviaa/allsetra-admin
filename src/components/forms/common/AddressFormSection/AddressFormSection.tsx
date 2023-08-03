import { FC, Fragment } from "react";
import { Stack } from "@mui/material";
import {
  TwoColsLayout,
  FormikInputField,
  FormikSelectField,
} from "@vilocnv/allsetra-core";
import { useAppSelector, useDispatchOnMount } from "hooks";
import { selectDashboardCountriesState } from "app/data/selectors";
import { getAllCountriesThunk } from "app/features";

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
  const { countries, loading } = useAppSelector(selectDashboardCountriesState);

  useDispatchOnMount(getAllCountriesThunk, countries.length ? undefined : true);

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
        <FormikSelectField
          label="Country"
          placeholder="Country"
          options={countries}
          optionLabelKey={"name"}
          optionValueKey={"id"}
          name={`${parentKey}.country`}
          loading={loading}
          searchable
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
