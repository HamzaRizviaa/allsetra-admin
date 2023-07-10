import { FC, useMemo } from "react";
import { types } from "@vilocnv/allsetra-core";
import { Formik, FormikHelpers } from "formik";
import { isEmpty } from "lodash";

// CHILDREN
import InnerForm from "./children/InnerForm";

// DATA
import { useAppDispatch } from "hooks";
import { objectDetailsFormatterForSettingsForm } from "app/data/helpers";
import { postUpdateObjectThunk } from "app/features";

interface Props {
  activeObject: types.IObject | null;
}

const ObjectSettingsForm: FC<Props> = ({ activeObject }) => {
  const dispatch = useAppDispatch();

  const initialValues = useMemo(
    () =>
      !isEmpty(activeObject)
        ? objectDetailsFormatterForSettingsForm(activeObject)
        : {},
    [activeObject]
  );

  const saveChangesHandler = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    formikHelpers.setSubmitting(true);

    await dispatch(postUpdateObjectThunk(values));

    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={saveChangesHandler}
      // validationSchema={{}}
      enableReinitialize
      validateOnMount
    >
      <InnerForm activeObject={activeObject} />
    </Formik>
  );
};

export default ObjectSettingsForm;
