import { FC } from "react";
import { Box } from "@mui/material";
import {
  ContentSectionLayout,
  FormikInputField,
  FormikSelectField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";
import { useGetAccountsIndustriesQuery } from "app/features";
import AddressFormSection from "components/forms/common/AddressFormSection/AddressFormSection";

const GeneralInformationForm: FC = () => {
  const { data: accountsIndustries, isLoading: accountsIndustriesLoading } =
    useGetAccountsIndustriesQuery();

  return (
    <ContentSectionLayout
      title="General information"
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
            label="Account number"
            name="accountNumber"
            placeholder="Account number"
            disabled
            fullWidth
          />
          <FormikInputField
            label="Account name"
            name="name"
            placeholder="Account name"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikSelectField
            label="Account type"
            name="accountType"
            options={[]}
            fullWidth
          />
          <FormikSelectField
            label="Industry"
            name="accountIndustry"
            optionLabelKey={"name"}
            optionValueKey={"id"}
            options={accountsIndustries || []}
            loading={accountsIndustriesLoading}
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikInputField
            label="Parent account"
            placeholder="Parent account"
            name="abc"
            fullWidth
          />
          <FormikInputField
            label="KVK number"
            placeholder="KVK number"
            name="kvkcocNumber"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikInputField
            label="BOBO ID"
            placeholder="BOBO ID"
            name="boboid"
            fullWidth
            disabled
          />
          <FormikInputField
            label="Multi-viewer ID"
            placeholder="Multi-viewer ID"
            name="multiViewerId"
            fullWidth
            disabled
          />
        </TwoColsLayout>
        <AddressFormSection
          title="Visiting Address"
          parentKey="visitingAddress"
        />
        <TwoColsLayout>
          <FormikInputField
            label="Website"
            placeholder="Website URL"
            name="website"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout fullWidth hideDivider>
          <FormikInputField
            label="Account Note"
            placeholder="Enter the note..."
            name="notes"
            fullWidth
            multiline
            rows={2}
          />
        </TwoColsLayout>
      </Box>
    </ContentSectionLayout>
  );
};

export default GeneralInformationForm;
