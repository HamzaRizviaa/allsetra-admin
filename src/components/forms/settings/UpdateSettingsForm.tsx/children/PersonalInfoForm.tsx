import { FC, useState } from "react";
import { Box, InputAdornment, useTheme } from "@mui/material";
import {
  ChangePasswordForm,
  ContentSectionLayout,
  FormikInputField,
  TwoColsLayout,
  types,
} from "@vilocnv/allsetra-core";
import { LockedIcon, MarkerIcon } from "assets/icons";
import { ChangePasswordContatiner } from "../UpdateSettingsForm.styled";
import { useAppDispatch } from "hooks";
import { FormikHelpers } from "formik";
import { resetPasswordThunk } from "app/features";

const PersonalInfoForm: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  //Local State
  const [open, setOpen] = useState(false); // Boolean state for ChangePasswordForm Modal

  const handleChangePassword = async (
    values: types.IChangePassword,
    formikHelpers: FormikHelpers<types.IChangePassword>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(
      resetPasswordThunk({ password: values.password })
    );

    if (type === "settings/resetPasswordThunk/fulfilled") {
      setOpen(false);
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <ContentSectionLayout
        title="Personal Info"
        subTitle="This information will be shown publicy, so be carefull with information you provide."
      >
        <Box>
          <TwoColsLayout>
            <FormikInputField
              label="User number"
              name="uniqueId"
              placeholder="User number"
              fullWidth
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormikInputField
              label="Email"
              placeholder="Email"
              name="email"
              fullWidth
              disabled
            />
          </TwoColsLayout>

          <TwoColsLayout>
            <FormikInputField
              label="First name"
              placeholder="First name"
              name="firstName"
              fullWidth
            />
            <FormikInputField
              label="Last name"
              placeholder="Last name"
              name="lastName"
              fullWidth
            />
          </TwoColsLayout>

          <TwoColsLayout hideDivider>
            <FormikInputField
              label="Phone number"
              placeholder="Phone number"
              name="phone"
              fullWidth
            />
          </TwoColsLayout>

          <TwoColsLayout hideDivider>
            <ChangePasswordContatiner onClick={() => setOpen(true)}>
              <MarkerIcon />
              <p>Change password</p>
            </ChangePasswordContatiner>
          </TwoColsLayout>
        </Box>
      </ContentSectionLayout>

      <ChangePasswordForm
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
        onSubmit={handleChangePassword}
      />
    </Box>
  );
};

export default PersonalInfoForm;
