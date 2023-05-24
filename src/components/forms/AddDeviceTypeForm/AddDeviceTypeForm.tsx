import { FC } from "react";
import { Box, Theme } from "@mui/material";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Formik, FormikHelpers } from "formik";
import InnerForm from "./children/InnerForm";
import { IAddDeviceType } from "app/data/types/deviceTypes";
import {
  addDeviceTypeFormModalInitialValues,
  addDeviceTypeValidationSchema,
} from "app/data/helpers/deviceHelpers";

export type AddDeviceProps = Pick<ModalProps, "title" | "open" | "onClose"> & {
  initialValues?: IAddDeviceType;
  onSubmit: (
    values: IAddDeviceType,
    formikHelpers: FormikHelpers<IAddDeviceType>
  ) => void;
  theme: Theme;
  objectTypeIcons: Array<any>;
  supportedDeviceTypes: Array<any>;
};

const AddDeviceForm: FC<AddDeviceProps> = ({
  open,
  onClose,
  initialValues,
  onSubmit,
  theme,
  objectTypeIcons,
  supportedDeviceTypes,
}) => (
  <Box>
    <Formik
      initialValues={initialValues || addDeviceTypeFormModalInitialValues}
      validationSchema={addDeviceTypeValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Modal
          open={open}
          onClose={onClose}
          title="Add user"
          primaryBtnProps={{
            type: "submit",
            text: "Add user",
            loading: isSubmitting,
            // @ts-ignore
            onClick: handleSubmit,
          }}
          secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
          theme={theme}
        >
          <InnerForm
            objectTypeIcons={objectTypeIcons}
            supportedDeviceTypes={supportedDeviceTypes}
          />
        </Modal>
      )}
    </Formik>
  </Box>
);

export default AddDeviceForm;
