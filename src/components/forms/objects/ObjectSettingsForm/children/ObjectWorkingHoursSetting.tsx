import { FC } from "react";
import {
  ContentSectionLayout,
  FormikTimeFrameField,
} from "@vilocnv/allsetra-core";
import { ChildFormBox } from "../ObjectSettingsForm.styled";

const ObjectWorkingHoursSetting: FC = () => {
  return (
    <ContentSectionLayout
      title="Working Hours"
      subTitle="Set working hours for you object."
    >
      <ChildFormBox>
        <FormikTimeFrameField
          label="Default working hours"
          typeName="workingHoursType"
          name="workingHours.workingHoursSchedule"
        />
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default ObjectWorkingHoursSetting;
