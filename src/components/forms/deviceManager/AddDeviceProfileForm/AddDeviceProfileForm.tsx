import { FC } from "react";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Form, Formik, FormikHelpers } from "formik";
import { useTheme } from "@mui/material";

import { IAddDeviceProfileType } from "app/data/types";
import InnerForm from "./children/InnerForm";
import { DeviceProfileFormIcon } from "assets/icons";
import { useAppDispatch } from "hooks";
import {
  deviceTypeProfilesInitialValues,
  deviceTypeProfilesValidationSchema,
} from "app/data/helpers";

export type Props = Omit<ModalProps, "title" | "children"> & {};

const AddDeviceProfileForm: FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const addDeviceProfileHandler = async (
    values: IAddDeviceProfileType,
    formikHelpers: FormikHelpers<IAddDeviceProfileType>
  ) => {};

  return (
    <Formik
      initialValues={deviceTypeProfilesInitialValues}
      validationSchema={deviceTypeProfilesValidationSchema}
      onSubmit={addDeviceProfileHandler}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <Form>
          <Modal
            open={open}
            onClose={onClose}
            headerIcon={<DeviceProfileFormIcon />}
            headerIconBgColor={theme.palette.primary.light}
            title={"Add device profile type"}
            subTitle={"Some description if needed."}
            primaryBtnProps={{
              type: "submit",
              text: "Add device profile type",
              loading: isSubmitting,
              disabled: !isValid,
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
  );
};

export default AddDeviceProfileForm;