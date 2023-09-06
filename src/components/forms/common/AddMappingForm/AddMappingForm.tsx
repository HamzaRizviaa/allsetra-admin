import { FC } from "react";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Form, Formik, FormikHelpers } from "formik";
import { useTheme } from "@mui/material";
import InnerForm from "./children/InnerForm";

//Data
import { IAddDMappingType } from "app/data/types";
import {
  addMappingInitialValues,
  addMappingValidationSchema,
} from "app/data/helpers";

export type AddMappingFormProps = Omit<ModalProps, "title" | "children"> & {
  dataPoints: Array<any>;
  identifiers: Array<any>;
  triggerModes: Array<any>;
  voltageThresholds: Array<any>;
};

const AddMappingForm: FC<AddMappingFormProps> = ({
  open,
  onClose,
  dataPoints,
  identifiers,
  triggerModes,
  voltageThresholds,
}) => {
  const theme = useTheme();

  const addMappingHandler = async (
    values: IAddDMappingType,
    formikHelpers: FormikHelpers<IAddDMappingType>
  ) => {};

  return (
    <Formik
      initialValues={addMappingInitialValues}
      validationSchema={addMappingValidationSchema}
      onSubmit={addMappingHandler}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <Form>
          <Modal
            open={open}
            onClose={onClose}
            title={"Add mapping"}
            primaryBtnProps={{
              type: "submit",
              text: "Add mapping",
              loading: isSubmitting,
              disabled: !isValid,
              onClick: handleSubmit,
            }}
            secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
            theme={theme}
          >
            <InnerForm
              dataPoints={dataPoints}
              identifiers={identifiers}
              triggerModes={triggerModes}
              voltageThresholds={voltageThresholds}
            />
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddMappingForm;
