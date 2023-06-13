import { FC, useEffect } from "react";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Form, Formik, FormikHelpers } from "formik";
import { useTheme } from "@mui/material";

import { IField } from "app/data/types";
import {
  addFieldInitialValues,
  addFieldValidationSchema,
} from "app/data/helpers/fieldHelpers";
import InnerForm from "./children/InnerForm";
import { FieldsFormIcon } from "assets/icons";
import { createOrUpdateFieldThunk, getAllFieldTypesThunk } from "app/features";
import { useAppDispatch } from "hooks";

export type Props = Omit<ModalProps, "title" | "children"> & {
  initialValues?: any;
  fieldTypes: Array<any>;
};

const AddFieldsForm: FC<Props> = ({
  open,
  onClose,
  initialValues,
  fieldTypes,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isEdit = initialValues?.uniqueId;
  const text = isEdit ? "Edit field" : "Add field";
  const buttonText = isEdit ? "Edit entry" : "Add entry";

  useEffect(() => {
    dispatch(getAllFieldTypesThunk());
  }, []);

  const addFieldHandler = async (
    values: IField,
    formikHelpers: FormikHelpers<IField>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(createOrUpdateFieldThunk(values));

    if (type === "fields/createOrUpdateFieldThunk/fulfilled") {
      onClose();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues || addFieldInitialValues}
      validationSchema={addFieldValidationSchema}
      onSubmit={addFieldHandler}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, dirty, isValid }) => (
        <Form>
          <Modal
            open={open}
            onClose={onClose}
            headerIcon={<FieldsFormIcon />}
            headerIconBgColor={theme.palette.primary.light}
            title={text}
            subTitle={"Some description if needed."}
            primaryBtnProps={{
              type: "submit",
              text: buttonText,
              loading: isSubmitting,
              disabled: isEdit ? (!dirty ? isValid : !isValid) : !isValid,
              onClick: handleSubmit,
            }}
            secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
            theme={theme}
          >
            <InnerForm fieldTypes={fieldTypes} />
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddFieldsForm;
