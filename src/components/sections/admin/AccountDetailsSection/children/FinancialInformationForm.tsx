import { FC } from "react";
import { Box } from "@mui/material";
import {
  ContentSectionLayout,
  FormikInputField,
  FormikSelectField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";

const FinancialInformationForm: FC = () => (
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
          name="number"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout title="Billing address">
        <FormikInputField
          label="Street"
          placeholder="Street"
          name="number"
          fullWidth
        />
        <FormikInputField
          label="Postal code"
          placeholder="Postal code"
          name="name"
          fullWidth
        />
        <FormikInputField
          label="City"
          placeholder="City"
          name="name"
          fullWidth
        />
        <FormikInputField
          label="Country"
          placeholder="Country"
          name="name"
          fullWidth
        />
        <FormikInputField
          label="Email"
          placeholder="Email"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikSelectField
          label="Payment method"
          name="Payment method"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
        <FormikSelectField
          label="Payment term"
          name="Payment term"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikInputField
          label="VAT number"
          placeholder="VAT number"
          name="number"
          fullWidth
        />
        <FormikInputField
          label="VAT Shifted (BTW Verlegd)"
          placeholder="VAT Shifted (BTW Verlegd)"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikInputField
          label="Bank account"
          placeholder="Bank account"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout title="Contract information" hideDivider>
        <TwoColsLayout fullWidth hideDivider>
          <FormikInputField
            label="Contract name"
            placeholder="Contract name"
            name="number"
            fullWidth
          />
        </TwoColsLayout>
        <FormikInputField
          label="Start date"
          placeholder="Start date"
          name="name"
          fullWidth
        />
        <FormikSelectField
          label="Contract duration"
          name="Contract duration"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
        <FormikSelectField
          label="Extension term"
          name="Extension term"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
        <FormikSelectField
          label="Cancelation term"
          name="Cancelation term"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
      </TwoColsLayout>
    </Box>
  </ContentSectionLayout>
);

export default FinancialInformationForm;
