import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, useFormikContext } from "formik";
import { Topbar, types } from "@vilocnv/allsetra-core";
import { Box, useTheme } from "@mui/material";

import ObjectInformationSetting from "./ObjectInformationSetting";
import DevicesSetting from "./DevicesSetting";
import CorrectionSetting from "./CorrectionSetting";
import ReminderSetting from "./ReminderSetting";
import AlarmConfigurationFormSection from "components/forms/common/AlarmConfigurationFormSection/AlarmConfigurationFormSection";
import NotificationsSetting from "./NotificationsSetting";
import ObjectWorkingHoursSetting from "./ObjectWorkingHoursSetting";
import DynamicFieldsSetting from "./DynamicFieldsSetting";

interface Props {
  activeObject: types.IObject | null;
}

const InnerForm: FC<Props> = ({ activeObject }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { handleSubmit, isSubmitting, dirty, isValid, resetForm } =
    useFormikContext();

  return (
    <Form>
      <Topbar
        theme={theme}
        breadcrumbTitle="Object details"
        breadcrumbRedirectTo={() => navigate(-1)}
        title={activeObject?.name || ""}
        primaryButton={{
          variant: "contained",
          text: "Save Changes",
          onClick: handleSubmit,
          loading: isSubmitting,
          disabled: !dirty ? isValid : !isValid,
        }}
        secondaryButton={{
          variant: "text",
          text: "Cancel",
          onClick: () => resetForm(),
        }}
      />
      <Box mx={4}>
        <ObjectInformationSetting />
        <DevicesSetting
          objectId={activeObject?.uniqueId || ""}
          devices={activeObject?.devices ?? []}
        />
        <DynamicFieldsSetting activeObject={activeObject} />
        <ObjectWorkingHoursSetting />
        <CorrectionSetting />
        <ReminderSetting />
        <AlarmConfigurationFormSection />
        <NotificationsSetting />
      </Box>
    </Form>
  );
};

export default InnerForm;
