import { FC } from "react";
import { Box, Typography } from "@mui/material";
import {
  ContentSectionLayout,
  FormikSelectField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";

const ManagementForm: FC = () => (
  <ContentSectionLayout
    title="Management"
    subTitle="Some text to help user understand what this block is responsible for."
    hideDivider
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
        <Typography variant={"subtitle2"}>Created by</Typography>
        <Typography variant={"subtitle2"} textAlign={"right"}>
          Allsetra
        </Typography>
      </TwoColsLayout>
      <TwoColsLayout>
        <Typography variant={"subtitle2"}>Modified by</Typography>
        <Typography variant={"subtitle2"} textAlign={"right"}>
          Allsetra
        </Typography>
      </TwoColsLayout>
      <TwoColsLayout hideDivider>
        <FormikSelectField
          label="Account owner"
          name="accountOwner"
          options={[]}
          onChange={() => {}}
          fullWidth
        />
      </TwoColsLayout>
    </Box>
  </ContentSectionLayout>
);

export default ManagementForm;
