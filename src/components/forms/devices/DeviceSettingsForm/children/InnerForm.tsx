import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, useFormikContext } from "formik";
import { Topbar } from "@vilocnv/allsetra-core";
import { Box, useTheme } from "@mui/material";
import { IDevices } from "app/data/types";
import GeneralSettings from "./GeneralSettings";
import ProfileConfigurationSettings from "./ProfileConfigurationSettings";
import InputToOutputConfigSettings from "./InputToOutputConfigSettings";
import DeviceIOMappingSettings from "./DeviceIOMappingSettings";

interface Props {
  specificDevice: IDevices | null;
  setOpenMappingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InnerForm: FC<Props> = ({ specificDevice, setOpenMappingModal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { handleSubmit, isSubmitting, dirty, isValid } = useFormikContext();

  return (
    <Form>
      <Topbar
        theme={theme}
        breadcrumbTitle="Device details"
        breadcrumbRedirectTo={() => navigate(-1)}
        title={`Settings ${specificDevice?.deviceType.name}`}
        primaryButton={{
          variant: "contained",
          text: "Save Changes",
          onClick: handleSubmit,
          loading: isSubmitting,
          disabled: !dirty ? isValid : !isValid,
        }}
      />
      <Box mx={4}>
        <GeneralSettings />
        <ProfileConfigurationSettings />
        <InputToOutputConfigSettings />
        <DeviceIOMappingSettings setOpenMappingModal={setOpenMappingModal} />
      </Box>
    </Form>
  );
};

export default InnerForm;
