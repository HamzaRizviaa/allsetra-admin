import { FC, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
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
import { CONTRACT_TERMS } from "app/data/constants";

const InnerForm: FC = () => {
  const dispatch = useAppDispatch();
  const currencies = useSelector(selectAllCurrencies);

  const { loading: subscriptionLoading, subscriptionTypes } = useAppSelector(
    selectSubscriptionsState
  );

  console.log("Subscription TYPES", subscriptionTypes);

  const { loading: deviceTypesLoading, deviceTypes } = useAppSelector(
    selectDeviceTypesState
  );

  const { loading: servicesLoading, allServices } = useAppSelector(
    selectServicManagerState
  );

  useEffect(() => {
    dispatch(getAllSubscriptionsThunk());
    dispatch(getAllDeviceTypesThunk());
    dispatch(getAllServicesThunk());
  }, []);

  useDispatchOnMount(
    getAllCurrenciesThunk,
    currencies.length ? undefined : true
  );

  useDispatchOnMount(
    getAllSubscriptionTypesThunk,
    subscriptionTypes.length ? undefined : true
  );

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
      <FormikSelectField
        label="Contract term"
        name="contractTerm"
        options={CONTRACT_TERMS}
        optionLabelKey="name"
        optionValueKey="id"
        required
      />
      <FormikInputField
        label="Prolongation term"
        name="prolongationInMonths"
        required
      />
      <FormikInputField
        label="Termination term"
        name="terminationInMonths"
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
