import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { ObjectBlueIcon } from "assets/icons";

// DATA
import { useAppDispatch } from "hooks";
import { IAddObjectType } from "app/data/types";
import { createOrUpdateObjectTypeThunk } from "app/features";
import InnerForm from "./children/InnerForm";
import {
  addObjectTypeInitialValues,
  addObjectTypeValidationSchema,
  objectTypeDataFormatterForService,
} from "app/data/helpers/objectTypeHelpers";

export type AddObjectTypeProps = Omit<ModalProps, "title" | "children"> & {
  initialValues?: any;
};

const ObjectTypeForm: FC<AddObjectTypeProps> = ({
  open,
  onClose,
  initialValues,
  ...rest
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isEdit = initialValues?.uniqueId;
  const text = isEdit ? "Edit object type" : "Add object type";

  const onSubmitHandler = async (
    values: IAddObjectType,
    formikHelpers: FormikHelpers<IAddObjectType>
  ) => {
    formikHelpers.setSubmitting(true);

    const objectTypeData = objectTypeDataFormatterForService(values);

    const { type } = await dispatch(
      createOrUpdateObjectTypeThunk(objectTypeData)
    );

    if (type === "objectType/createOrUpdateObjectTypeThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues || addObjectTypeInitialValues}
        validationSchema={addObjectTypeValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, dirty, isValid, resetForm }) => (
          <Form>
            <Modal
              open={open}
              onClose={() => {
                onClose();
                resetForm();
              }}
              headerIcon={<ObjectBlueIcon />}
              headerIconBgColor={theme.palette.primary.light}
              title={text}
              subTitle={"Some description if needed."}
              primaryBtnProps={{
                type: "submit",
                text: text,
                loading: isSubmitting,
                disabled: isEdit ? (!dirty ? isValid : !isValid) : !isValid,
                // @ts-ignore
                onClick: handleSubmit,
              }}
              secondaryBtnProps={{
                text: "Cancel",
                onClick: () => {
                  onClose();
                  resetForm();
                },
              }}
              theme={theme}
              {...rest}
            >
              <InnerForm />
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ObjectTypeForm;
