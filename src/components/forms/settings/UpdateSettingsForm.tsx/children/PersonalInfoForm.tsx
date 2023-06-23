import { FC } from "react";
import { Box, InputAdornment } from "@mui/material";
import {
  ContentSectionLayout,
  FormikInputField,
  TwoColsLayout,
} from "@vilocnv/allsetra-core";
import { LockedIcon, MarkerIcon } from "assets/icons";
import { ChangePasswordContatiner } from "../UpdateSettingsForm.styled";

const PersonalInfoForm: FC = () => (
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
        <ChangePasswordContatiner>
          <MarkerIcon />
          <p>Change password</p>
        </ChangePasswordContatiner>
      </TwoColsLayout>
    </Box>
  </ContentSectionLayout>
);

export default PersonalInfoForm;
