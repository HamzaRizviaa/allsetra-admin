import { FC } from "react";
import { Box } from "@mui/material";
import {
  ContentSectionLayout,
  FormikSelectField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";

interface Props {
  languages: Array<any>;
  languagesLoading: boolean;
}

const InterfaceForm: FC<Props> = ({ languagesLoading, languages }) => (
  <ContentSectionLayout
    title="Interface"
    subTitle="Customize interface to your preferences and needs ang get the most from using Allsetra."
    hideDivider
  >
    <Box>
      <TwoColsLayout hideDivider>
        <FormikSelectField
          label="Language"
          name="language"
          options={languages}
          optionLabelKey="languageName"
          optionValueKey="languageId"
          loading={languagesLoading}
        />
      </TwoColsLayout>
    </Box>
  </ContentSectionLayout>
);

export default InterfaceForm;
