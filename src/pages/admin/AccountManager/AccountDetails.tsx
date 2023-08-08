import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import { useTheme } from "@mui/material";
import { Topbar, types } from "@vilocnv/allsetra-core";
import { capitalize, isEmpty } from "lodash";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";
import AccountDetailsSection from "components/sections/admin/AccountDetailsSection/AccountDetailsSection";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectActiveAccountState } from "app/data/selectors";
import { updateAccountThunk } from "app/features";
import {
  accountDetailsFormatterForForm,
  accountDetailsValidationSchema,
} from "app/data/helpers";

const AccountDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Global State
  const { activeAccount } = useAppSelector(selectActiveAccountState);

  const initialValues = useMemo(
    () =>
      !isEmpty(activeAccount)
        ? accountDetailsFormatterForForm(activeAccount)
        : {},
    [activeAccount]
  );

  const saveChangesHandler = async (
    values: types.IAccount,
    formikHelpers: FormikHelpers<types.IAccount>
  ) => {
    formikHelpers.setSubmitting(true);

    await dispatch(
      updateAccountThunk({ accountId: values?.uniqueId, data: values })
    );

    formikHelpers.setSubmitting(false);
  };

  return (
    <main>
      <Formik
        // @ts-ignore
        initialValues={initialValues}
        validationSchema={accountDetailsValidationSchema}
        onSubmit={saveChangesHandler}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty, resetForm }) => (
          <Form>
            <Topbar
              theme={theme}
              title="Account"
              breadcrumbTitle={capitalize(activeAccount?.name) ?? "Go Back"}
              breadcrumbRedirectTo={() => navigate(-1)}
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
            <AccountTabLayout>
              <AccountDetailsSection />
            </AccountTabLayout>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default AccountDetails;
