import { FC, useEffect } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikInputField,
} from "@vilocnv/allsetra-core";
import { ChildFormBox } from "components/forms/objects/ObjectSettingsForm/ObjectSettingsForm.styled";

const GeneralSettings: FC = () => {
  return (
    <ContentSectionLayout
      title="General settings"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <TwoColsLayout hideDivider>
          <FormikInputField
            label="Device ID"
            name="uniqueId"
            fullWidth
            disabled
          />
          <FormikInputField label="Label" name="label" fullWidth />
        </TwoColsLayout>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default GeneralSettings;
