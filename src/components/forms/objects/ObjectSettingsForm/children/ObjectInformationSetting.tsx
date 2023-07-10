import { FC } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikInputField,
  FormikSelectField,
} from "@vilocnv/allsetra-core";
import { ChildFormBox } from "../ObjectSettingsForm.styled";

const ObjectInformationSetting: FC = () => {
  return (
    <ContentSectionLayout
      title="Object information"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <TwoColsLayout>
          <FormikInputField label="Object Name" name="name" fullWidth />
          {/* <FormikSelectField
            label="Object Type"
            name="name"
            options={[]}
            fullWidth
          /> */}
        </TwoColsLayout>
        {/* <TwoColsLayout>
          <FormikSelectField
            label="Assigned Accounts"
            name="name"
            options={[]}
            searchable
            multiple
            fullWidth
          />
          <FormikSelectField
            label="Assigned Users"
            name="name"
            options={[]}
            searchable
            multiple
            fullWidth
          />
          <FormikSelectField label="Owner" name="name" options={[]} fullWidth />
        </TwoColsLayout> */}
        <TwoColsLayout>
          <FormikInputField label="A-Number" name="aNumber" fullWidth />
          <FormikInputField
            label="Multiviewer Name"
            name="multiviewerName"
            fullWidth
          />
        </TwoColsLayout>
        <TwoColsLayout>
          <FormikInputField label="Milage" name="mileage" fullWidth />
        </TwoColsLayout>
        <TwoColsLayout hideDivider>
          <FormikInputField
            label="Comments"
            name="comments"
            multiline
            rows={2}
          />
        </TwoColsLayout>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default ObjectInformationSetting;
