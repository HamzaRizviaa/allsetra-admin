import { FC, useEffect, useMemo } from "react";
import { difference, isEmpty, omit } from "lodash";
import { Stack } from "@mui/material";
import { FormikSelectField, types } from "@vilocnv/allsetra-core";
import { FieldArray, useFormikContext } from "formik";
import ServiceSubscriptionsPricing from "./ServiceSubscriptionsPricing";

// DATA
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import {
  getAllSubscriptionsThunk,
  useGetAvailableServicesForAccountQuery,
  getAllCurrenciesThunk,
} from "app/features";
import {
  selectSubscriptionsState,
  selectDashboardCurrenciesState,
} from "app/data/selectors";
import { IAccountAssignService } from "app/data/types";

interface Props {
  accountId: string | null;
  service?: types.IAdminService | null;
}

const InnerForm: FC<Props> = ({ accountId, service }) => {
  const dispatch = useAppDispatch();

  const { values, setFieldValue } = useFormikContext<IAccountAssignService>();

  const { allSubscriptions, loading: subscriptionsLoading } = useAppSelector(
    selectSubscriptionsState
  );

  const { currencies, loading: currenciesLoading } = useAppSelector(
    selectDashboardCurrenciesState
  );

  useEffect(() => {
    dispatch(getAllSubscriptionsThunk());
  }, []);

  useDispatchOnMount(
    getAllCurrenciesThunk,
    currencies.length ? undefined : true
  );

  const { data, isLoading } = useGetAvailableServicesForAccountQuery(accountId);

  const services = useMemo(() => {
    if (isEmpty(data)) return [];
    
    return isEmpty(service)
      ? data
      : [...data, { uniqueId: service.uniqueId, name: service.name }];
  }, [data, service]);

  const subscriptionsChangeHandler = (value: any) => {
    const isSubscriptionsAdded =
      value.length > values.subscriptions.length ? true : false;

    const diffBetweenLists: string[] = isSubscriptionsAdded
      ? difference(value, values.subscriptions)
      : difference(values.subscriptions, value);

    // Could be the subscriptionId of either added or removed item
    const subscriptionId: string =
      diffBetweenLists.length > 0 ? diffBetweenLists[0] : "";

    if (isSubscriptionsAdded && !isEmpty(subscriptionId)) {
      setFieldValue("subscriptionsPricing", {
        ...values.subscriptionsPricing,
        [`${subscriptionId}`]: {
          currency: 0,
          subscriptionPrice: 0,
        },
      });
    } else {
      setFieldValue(
        "subscriptionsPricing",
        omit(values.subscriptionsPricing, [subscriptionId])
      );
    }

    setFieldValue("subscriptions", value);
  };

  return (
    <Stack spacing={2}>
      <FormikSelectField
        label="Service type"
        name="serviceId"
        options={services || []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={isLoading}
        required
      />
      <FormikSelectField
        label="Subscriptions"
        name="subscriptions"
        options={allSubscriptions || []}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        onChange={subscriptionsChangeHandler}
        loading={subscriptionsLoading}
        multiple
        searchable
        required
      />
      <FieldArray
        name="subscriptions"
        render={(props) => (
          <ServiceSubscriptionsPricing
            {...props}
            subscriptions={allSubscriptions || []}
            currencies={currencies || []}
            currenciesLoading={currenciesLoading}
          />
        )}
      />
    </Stack>
  );
};

export default InnerForm;
