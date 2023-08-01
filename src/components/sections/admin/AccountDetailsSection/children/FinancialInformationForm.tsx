import { FC } from "react";
import { Box } from "@mui/material";
import {
  ContentSectionLayout,
  FormikInputField,
  FormikSelectField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";
import AddressFormSection from "components/forms/common/AddressFormSection/AddressFormSection";

import { useAppSelector, useDispatchOnMount } from "hooks";
import { selectDashboardPaymentMethodsState } from "app/data/selectors";
import { getAllPaymentMethodsThunk } from "app/features";

const FinancialInformationForm: FC = () => {
  const { paymentMethods, loading: paymentMethodsLoading } = useAppSelector(
    selectDashboardPaymentMethodsState
  );

  useDispatchOnMount(
    getAllPaymentMethodsThunk,
    paymentMethods.length ? undefined : true
  );

  return (
    <ContentSectionLayout
      title="Financial information"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <Box
        sx={{
          marginTop: {
            xs: "32px",
            md: "0px",
          },
        }}
      >
        <TwoColsLayout>
          <FormikInputField
            label="AFAS Debit number"
            placeholder="AFAS Debit number"
            name="afasDebitNumber"
            fullWidth
          />
        </TwoColsLayout>
        <AddressFormSection
          title="Billing address"
          parentKey="billingAddress"
        />
        <TwoColsLayout>
          <FormikSelectField
            label="Payment method"
            placeholder="Payment method"
            name="paymentMethod"
            options={paymentMethods || []}
            optionLabelKey={"name"}
            optionValueKey={"id"}
            loading={paymentMethodsLoading}
            fullWidth
          />
          <FormikSelectField
            label="Payment term"
            placeholder="Payment term"
            name="paymentTermInDays"
            options={[]}
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikInputField
            label="VAT number"
            placeholder="VAT number"
            name="vatNumber"
            fullWidth
          />
          <FormikInputField
            label="VAT Shifted (BTW Verlegd)"
            placeholder="VAT Shifted (BTW Verlegd)"
            name="vatShifted"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout hideDivider>
          <FormikInputField
            label="Bank account"
            placeholder="Bank account"
            name="bankAccount"
            fullWidth
          />
        </TwoColsLayout>
      </Box>
    </ContentSectionLayout>
  );
};
export default FinancialInformationForm;
