import { FC } from "react";
import { Box } from "@mui/material";
import {
  ContentSectionLayout,
  FormikInputField,
  FormikSelectField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";

const GeneralInformationForm: FC = () => (
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
          name="number"
          placeholder="Account number"
          fullWidth
        />
        <FormikInputField
          label="Account name"
          name="name"
          placeholder="Account number"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikSelectField
          label="Account type"
          name="Account type"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
        <FormikSelectField
          label="Industry"
          name="Industry"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikInputField
          label="Parent account"
          placeholder="Parent account"
          name="number"
          fullWidth
        />
        <FormikInputField
          label="KVK number"
          placeholder="KVK number"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikInputField
          label="BOBO ID"
          placeholder="BOBO ID"
          name="number"
          fullWidth
        />
        <FormikInputField
          label="Multi-viewer ID"
          placeholder="Multi-viewer ID"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout title="Visiting address">
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
        <FormikInputField
          label="Phone number"
          placeholder="Phone number"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout>
        <FormikInputField
          label="Website"
          placeholder="Website URL"
          name="name"
          fullWidth
        />
      </TwoColsLayout>
      <TwoColsLayout fullWidth hideDivider>
        <FormikInputField
          label="Account Note"
          placeholder="Enter the note..."
          name="name"
          fullWidth
          multiline
          rows={2}
        />
      </TwoColsLayout>
    </Box>
  </ContentSectionLayout>
);

export default GeneralInformationForm;
