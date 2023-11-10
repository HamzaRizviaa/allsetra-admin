import { FC, useCallback } from "react";
import { FieldArrayRenderProps } from "formik";
import { Stack, Typography, useTheme } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";

interface Props extends FieldArrayRenderProps {
  subscriptions: Array<any>;
  currencies: Array<any>;
  currenciesLoading: boolean;
}

const ServiceSubscriptionsPricing: FC<Props> = ({
  form,
  subscriptions,
  currencies,
  currenciesLoading,
}) => {
  const theme = useTheme();

  const getSubscriptionNameById = useCallback(
    (id: string) =>
      subscriptions.find((item) => item.uniqueId === id)?.name || "",
    [subscriptions]
  );

  return (
    <Stack spacing={1}>
      {form.values.subscriptions.map((subscriptionId: string) => (
        <Stack spacing={1} key={subscriptionId}>
          <Typography fontSize={12} color={theme.palette.primary.main}>
            {getSubscriptionNameById(subscriptionId)}
          </Typography>
          <FormikSelectField
            label="Currency"
            placeholder="Currency"
            name={`subscriptionsPricing[${subscriptionId}].currency`}
            options={currencies}
            optionLabelKey="name"
            optionValueKey="id"
            loading={currenciesLoading}
          />
          <FormikInputField
            label="Price"
            name={`subscriptionsPricing[${subscriptionId}].subscriptionPrice`}
            type={"number"}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default ServiceSubscriptionsPricing;
