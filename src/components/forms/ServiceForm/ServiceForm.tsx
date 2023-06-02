import { FC, useMemo } from "react";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { ServiceBlueIcon } from "assets/icons";

// DATA
import { useAppDispatch } from "hooks";
import { IAddService } from "app/data/types";
import {
  addServiceInitialValues,
  addServiceValidationSchema,
} from "app/data/helpers";
import { createOrUpdateServiceThunk } from "app/features";
import InnerForm from "./children/InnerForm";

export type Props = Omit<ModalProps, "title" | "children"> & {
  initialValues?: any;
};

const ServiceForm: FC<Props> = ({ open, onClose, initialValues }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isEdit = initialValues?.uniqueId;
  const text = isEdit ? "Edit service" : "Add service";

  const formInitialValues = useMemo(
    () => (!isEmpty(initialValues) ? initialValues : addServiceInitialValues),
    [initialValues]
  );

  const onSubmitHandler = async (
    values: IAddService,
    formikHelpers: FormikHelpers<IAddService>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(createOrUpdateServiceThunk(values));

    if (type === "serviceManager/createOrUpdateServiceThunk/fulfilled") {
      onClose();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={formInitialValues}
        validationSchema={addServiceValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, dirty, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              headerIcon={<ServiceBlueIcon />}
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

export default ServiceForm;
