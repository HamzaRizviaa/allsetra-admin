import { FC } from "react";
import { Box } from "@mui/material";
import {
  ContentSectionLayout,
  FormikInputField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";

const LogisticsForm: FC = () => (
  <ContentSectionLayout
    title="Logistics"
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
      <TwoColsLayout title="Shipping address" hideDivider>
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
    </Box>
  </ContentSectionLayout>
);

export default LogisticsForm;
