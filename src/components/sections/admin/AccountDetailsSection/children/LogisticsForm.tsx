import { FC } from "react";
import { Box } from "@mui/material";
import { ContentSectionLayout } from "@vilocnv/allsetra-core";
import AddressFormSection from "components/forms/common/AddressFormSection/AddressFormSection";

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
      <AddressFormSection
        title="Shipping address"
        parentKey="shippingAddress"
        hideDivider
      />
    </Box>
  </ContentSectionLayout>
);

export default LogisticsForm;
