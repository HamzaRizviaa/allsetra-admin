import { FC, useMemo } from "react";
import { Stack } from "@mui/material";
import { FormikInputField, FormikSelectField } from "@vilocnv/allsetra-core";
import {
  getAllCurrenciesThunk,
  useGetAvailableDeviceTypesForAccountQuery,
} from "app/features";
import { useFormikContext } from "formik";
import { IAccountAssignDeviceType } from "app/data/types";
import { isEmpty } from "lodash";
import { selectDashboardCurrenciesState } from "app/data/selectors";
import { useAppSelector, useDispatchOnMount } from "hooks";

interface Props {
  accountId: string | null;
}

const InnerForm: FC<Props> = ({ accountId }) => {
  const { currencies, loading: currenciesLoading } = useAppSelector(
    selectDashboardCurrenciesState
  );

  useDispatchOnMount(
    getAllCurrenciesThunk,
    currencies.length ? undefined : true
  );

  const { data, isLoading } = useGetAvailableDeviceTypesForAccountQuery(
    accountId,
    { refetchOnMountOrArgChange: true }
  );

  const { values } = useFormikContext<IAccountAssignDeviceType>();

  const profiles = useMemo(() => {
    if (isEmpty(data)) return [];

    const deviceType = data.find(
      (account: any) => account.uniqueId === values.deviceTypeId
    );

    return deviceType ? deviceType.deviceProfiles : [];
  }, [values.deviceTypeId]);

  return (
    <Stack spacing={2}>
      <FormikSelectField
        label="Device type"
        name="deviceTypeId"
        options={data ?? []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={isLoading}
        required
      />
      <FormikSelectField
        label="Device profile"
        name="deviceProfileId"
        options={profiles ?? []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={isLoading}
        required
      />
      <FormikSelectField
        label="Select currency"
        name="currency"
        options={currencies ?? []}
        optionLabelKey="name"
        optionValueKey="id"
        loading={currenciesLoading}
        required
      />
      <FormikInputField
        label="Price"
        name="price"
        placeholder="Price"
        required
      />
    </Stack>
  );
};

export default InnerForm;
