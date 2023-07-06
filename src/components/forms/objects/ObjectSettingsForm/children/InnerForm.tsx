import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, useFormikContext } from "formik";
import { Topbar } from "@vilocnv/allsetra-core";
import { Box, useTheme } from "@mui/material";

const InnerForm: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { handleSubmit, isSubmitting, dirty, isValid } = useFormikContext();

  return (
    <Form>
      <Topbar
        theme={theme}
        title="User Settings"
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
          onClick: () => {
            navigate(-1);
          },
        }}
      />
      <Box></Box>
    </Form>
  );
};

export default InnerForm;
