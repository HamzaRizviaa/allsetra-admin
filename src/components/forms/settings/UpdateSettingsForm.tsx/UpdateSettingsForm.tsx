import { FC, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { Topbar } from "@vilocnv/allsetra-core";
import { isEmpty } from "lodash";

//Children
import PersonalInfoForm from "./children/PersonalInfoForm";
import InterfaceForm from "./children/InterfaceForm";

//Data
import {
  userSettingsInitialValues,
  userSettingsValidationSchema,
} from "app/data/helpers/settingsHelpers";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectLanguageState, selectSettingsState } from "app/data/selectors";
import { ISettings } from "app/data/types";
import { updateSettingsThunk } from "app/features";

const UpdateSettingsForm: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //Global States
  const { specificSetting } = useAppSelector(selectSettingsState);
  const { languagesLoading, languages } = useAppSelector(selectLanguageState);

  const formValues = useMemo(
    () =>
      !isEmpty(specificSetting) ? specificSetting : userSettingsInitialValues,
    [specificSetting]
  );

  const handleUserSettings = async (
    values: ISettings,
    formikHelpers: FormikHelpers<ISettings>
  ) => {
    formikHelpers.setSubmitting(true);

    await dispatch(
      updateSettingsThunk({ ...values, languageId: values.language })
    );

    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      //@ts-ignore
      initialValues={formValues}
      onSubmit={handleUserSettings}
      validationSchema={userSettingsValidationSchema}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, dirty, isValid }) => (
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
          <Box px={"32px"}>
            <PersonalInfoForm />
            <InterfaceForm
              languages={languages}
              languagesLoading={languagesLoading}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateSettingsForm;
