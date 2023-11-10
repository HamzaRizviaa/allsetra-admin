import { FC } from "react";
import {
  ContentSectionLayout,
  TwoColsLayout,
  FormikInputField,
  types,
} from "@vilocnv/allsetra-core";
import { ChildFormBox } from "../ObjectSettingsForm.styled";

interface Props {
  activeObject: types.IObject | null;
}

const DynamicFieldsSetting: FC<Props> = ({ activeObject }) => {
  return activeObject?.metadata?.length ? (
    <ContentSectionLayout
      title="Dynamic fields"
      subTitle="Fill in the object dynamic fields.."
    >
      <ChildFormBox>
        <TwoColsLayout>
          {activeObject.metadata.map((metadata) => (
            <FormikInputField
              label={metadata.field.label}
              name={metadata.field.label}
              placeholder={metadata.field.label}
              fullWidth
            />
          ))}
        </TwoColsLayout>
      </ChildFormBox>
    </ContentSectionLayout>
  ) : (
    <></>
  );
};

export default DynamicFieldsSetting;
