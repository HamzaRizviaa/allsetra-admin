import { FC } from "react";
import { Modal } from "@vilocnv/allsetra-core";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { useTheme } from "@mui/material";
import InnerForm from "./children/InnerForm";

//Data
import { IAddDMappingType, IAddDeviceProfileType } from "app/data/types";
import {
  addMappingInitialValues,
  addMappingValidationSchema,
} from "app/data/helpers";
import { AddDeviceProfileProps } from "components/forms/deviceManager/AddDeviceProfileForm/AddDeviceProfileForm";

export type AddMappingFormProps = AddDeviceProfileProps & {
  dataPoints: Array<any>;
  identifiers: Array<any>;
  triggerModes: Array<any>;
  identifierLoading?: boolean;
};

const AddMappingForm: FC<AddMappingFormProps> = ({
  open,
  onClose,
  dataPoints,
  identifiers,
  triggerModes,
  deviceTypeId,
  loading,
  identifierLoading,
}) => {
  const theme = useTheme();

  const { setFieldValue, values } = useFormikContext<IAddDeviceProfileType>();

  const addMappingHandler = async (
    valuesMapping: IAddDMappingType,
    formikHelpers: FormikHelpers<IAddDMappingType>
  ) => {
    setFieldValue("mappings", [...values.mappings, valuesMapping]);
    onClose();
    formikHelpers.resetForm();
  };

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
            loading={loading}
          >
            <InnerForm
              dataPoints={dataPoints}
              identifiers={identifiers}
              triggerModes={triggerModes}
              deviceTypeId={deviceTypeId}
              identifierLoading={identifierLoading}
            />
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default AddMappingForm;
