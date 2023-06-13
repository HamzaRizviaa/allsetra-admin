import { FC, useMemo } from "react";
import { isEmpty } from "lodash";
import { Box, Theme, useTheme } from "@mui/material";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { ObjectBlueIcon } from "assets/icons";

// DATA
import { useAppDispatch, useAppSelector } from "hooks";
import { IAddObjectType } from "app/data/types";
import { createOrUpdateObjectTypeThunk } from "app/features";
import InnerForm from "./children/InnerForm";
import {
  addObjectTypeInitialValues,
  addObjectTypeValidationSchema,
  objectTypeDataFormatterForService,
} from "app/data/helpers/objectTypeHelpers";
import { selectDeviceTypesState } from "app/data/selectors";

export type AddObjectTypeProps = Pick<ModalProps, "open" | "onClose"> & {
  initialValues?: IAddObjectType;
  onSubmit: (
    values: IAddObjectType,
    formikHelpers: FormikHelpers<IAddObjectType>
  ) => void;
  theme: Theme;
};

const ObjectTypeForm: FC<AddObjectTypeProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isEdit = initialValues?.uniqueId;
  const text = isEdit ? "Edit object type" : "Add object type";
  const { deviceTypes } = useAppSelector(selectDeviceTypesState);

  const formInitialValues = useMemo(
    () =>
      !isEmpty(initialValues) ? initialValues : addObjectTypeInitialValues,
    [initialValues]
  );

  const onSubmitHandler = async (
    values: IAddObjectType,
    formikHelpers: FormikHelpers<IAddObjectType>
  ) => {
    formikHelpers.setSubmitting(true);

    const objectTypeData = objectTypeDataFormatterForService(
      values,
      deviceTypes
    );

    const { type } = await dispatch(
      createOrUpdateObjectTypeThunk(objectTypeData)
    );

    if (type === "objectType/createOrUpdateObjectTypeThunk/fulfilled") {
      onClose();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={formInitialValues}
        validationSchema={addObjectTypeValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, dirty, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
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
              secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
              theme={theme}
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
