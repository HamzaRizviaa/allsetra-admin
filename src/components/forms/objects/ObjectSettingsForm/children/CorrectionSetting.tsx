import { FC } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikInputField,
  Button,
} from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { ChildFormBox } from "../ObjectSettingsForm.styled";

const CorrectionSetting: FC = () => {
  return (
    <ContentSectionLayout
      title="Correction"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <TwoColsLayout hideDivider>
          <FormikInputField label="New milage" name="name" fullWidth />
          <FormikInputField
            label="Correction date"
            type={"date"}
            name="name"
            fullWidth
          />
        </TwoColsLayout>
        <Stack mt={4} direction={"row"} spacing={2}>
          <Button variant={"contained"} size={"small"}>
            Add correction
          </Button>
          <Button variant={"text"} size={"small"}>
            Cancel
          </Button>
        </Stack>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default CorrectionSetting;
