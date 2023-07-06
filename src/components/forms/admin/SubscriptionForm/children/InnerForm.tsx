import { FC, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectAllCurrencies,
  selectDeviceTypesState,
  selectServicManagerState,
  selectSubscriptionsState,
} from "app/data/selectors";
import {
  getAllCurrenciesThunk,
  getAllDeviceTypesThunk,
  getAllServicesThunk,
  getAllSubscriptionTypesThunk,
  getAllSubscriptionsThunk,
} from "app/features";

const InnerForm: FC = () => {
  const dispatch = useAppDispatch();
  const currencies = useSelector(selectAllCurrencies);

  const { loading: subscriptionLoading, subscriptionTypes } = useAppSelector(
    selectSubscriptionsState
  );

  const { loading: deviceTypesLoading, deviceTypes } = useAppSelector(
    selectDeviceTypesState
  );

  const { loading: servicesLoading, allServices } = useAppSelector(
    selectServicManagerState
  );

  useEffect(() => {
    dispatch(getAllSubscriptionsThunk());
    dispatch(getAllDeviceTypesThunk());
    dispatch(getAllSubscriptionTypesThunk());
    dispatch(getAllCurrenciesThunk());
    dispatch(getAllServicesThunk());
  }, []);

  return (
    <Stack spacing={2}>
      <FormikInputField label="Subscription name" name="name" required />
      <FormikInputField
        label="Details"
        name="details"
        multiline
        rows={3}
        required
      />
      <FormikSelectField
        label="Subscription type"
        name="subscriptionType"
        options={subscriptionTypes}
        optionLabelKey="name"
        optionValueKey="id"
        loading={subscriptionLoading}
        required
      />
      <FormikInputField
        label="Duration (months)"
        name="durationInMonths"
        required
      />
      <Box sx={{ display: "flex" }}>
        <FormikSelectField
          label="Plan price"
          name="currency"
          options={currencies}
          optionLabelKey="name"
          optionValueKey="id"
          loading={subscriptionLoading}
          required
        />
        <FormikInputField label="" name="valuePerMonth" required />
      </Box>
      <FormikSelectField
        label="Device type"
        name="deviceTypes"
        options={deviceTypes}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={deviceTypesLoading}
        required
        multiple
      />
      <FormikSelectField
        label="Service type"
        name="serviceId"
        options={allServices}
        optionLabelKey="name"
        optionValueKey="uniqueId"
        loading={servicesLoading}
        required
      />
    </Stack>
  );
};

export default InnerForm;
