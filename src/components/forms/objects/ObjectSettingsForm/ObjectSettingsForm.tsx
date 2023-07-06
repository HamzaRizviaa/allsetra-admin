import { FC, useMemo } from "react";
import { useTheme } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

// DATA
import { userSettingsValidationSchema } from "app/data/helpers/settingsHelpers";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueriedObjectsState } from "app/data/selectors";

// CHILDREN
import InnerForm from "./children/InnerForm";

const ObjectSettingsForm: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //Global States
  const { activeObject } = useAppSelector(selectQueriedObjectsState);

  const initialValues = useMemo(
    () => (!isEmpty(activeObject) ? activeObject : {}),
    [activeObject]
  );

  const saveChangesHandler = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={saveChangesHandler}
      validationSchema={userSettingsValidationSchema}
      enableReinitialize
      validateOnMount
    >
      <InnerForm />
    </Formik>
  );
};

export default ObjectSettingsForm;
