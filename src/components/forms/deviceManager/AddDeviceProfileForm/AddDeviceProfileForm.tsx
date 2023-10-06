import React, { FC, useEffect, useState } from "react";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Form, Formik, FormikHelpers } from "formik";
import { useTheme } from "@mui/material";

import { IAddDeviceProfileType } from "app/data/types";
import InnerForm from "./children/InnerForm";
import { DeviceProfileFormIcon } from "assets/icons";
import {
  deviceTypeProfilesInitialValues,
  deviceTypeProfilesValidationSchema,
} from "app/data/helpers";
import AddMappingForm from "components/forms/common/AddMappingForm/AddMappingForm";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  createOrUpdateDeviceTypesProfileThunk,
  getDeviceTypesProfileDataPoints,
  getDeviceTypesProfileEnvironments,
  getDeviceTypesProfileIdentifiers,
  getDeviceTypesProfileInputPins,
  getDeviceTypesProfileOutputPins,
  getDeviceTypesProfileTriggerModes,
  resetSpecificDeviceTypeProfile,
  setUniqueIdentifiers,
} from "app/features";
import { selectAddDeviceTypesProfileState } from "app/data/selectors";

export type AddDeviceProfileProps = Omit<ModalProps, "title" | "children"> & {
  deviceTypeId?: string | null;
  initialValues?: any;
};

const AddDeviceProfileForm: FC<AddDeviceProfileProps> = ({
  open,
  onClose,
  deviceTypeId,
  initialValues,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const {
    deviceTypesProfilesDataPoints,
    deviceTypesProfilesIdentifiers,
    loading,
    identifierLoading,
    deviceTypesProfilesTriggerModes,
    deviceTypesProfilesEnvironments,
    deviceTypesProfilesInputPins,
    deviceTypesProfilesOutputPins,
    allIdentifiers,
  } = useAppSelector(selectAddDeviceTypesProfileState);

  const [openMappingModal, setOpenMappingModal] = useState(false); // Used for Add Mapping Modal

  const isEdit = initialValues?.uniqueId;
  const text = isEdit ? "Edit device profile type" : "Add device profile type";

  useEffect(() => {
    if (deviceTypeId) {
      dispatch(getDeviceTypesProfileDataPoints(deviceTypeId));
      dispatch(getDeviceTypesProfileTriggerModes(deviceTypeId));
      dispatch(getDeviceTypesProfileEnvironments(deviceTypeId));
      dispatch(getDeviceTypesProfileInputPins(deviceTypeId));
      dispatch(getDeviceTypesProfileOutputPins(deviceTypeId));
    }
  }, []);

  useEffect(() => {
    if (deviceTypesProfilesDataPoints.length && !allIdentifiers.length) {
      deviceTypesProfilesDataPoints.map((data) =>
        dispatch(
          getDeviceTypesProfileIdentifiers({
            deviceTypeId,
            fieldId: data.id,
          })
        )
      );
    }
    dispatch(setUniqueIdentifiers(allIdentifiers));
  }, [deviceTypesProfilesDataPoints]);

  const addDeviceProfileHandler = async (
    values: IAddDeviceProfileType,
    formikHelpers: FormikHelpers<IAddDeviceProfileType>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(
      createOrUpdateDeviceTypesProfileThunk({ deviceTypeId, data: values })
    );

    if (
      type === "deviceManager/createOrUpdateDeviceTypesProfileThunk/fulfilled"
    ) {
      onClose();
    }

    formikHelpers.setSubmitting(false);
  };

  useEffect(() => {
    !open && dispatch(resetSpecificDeviceTypeProfile());
  }, [open]);

  return (
    <Formik
      initialValues={initialValues || deviceTypeProfilesInitialValues}
      validationSchema={deviceTypeProfilesValidationSchema}
      onSubmit={addDeviceProfileHandler}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, isValid, dirty }) => (
        <Form>
          <Modal
            open={open}
            onClose={onClose}
            headerIcon={<DeviceProfileFormIcon />}
            headerIconBgColor={theme.palette.primary.light}
            title={text}
            subTitle={"Some description if needed."}
            primaryBtnProps={{
              type: "submit",
              text: text,
              loading: isSubmitting,
              disabled: isEdit ? (!dirty ? isValid : !isValid) : !isValid,
              onClick: handleSubmit,
            }}
            secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
            theme={theme}
            loading={loading}
          >
            <InnerForm
              setOpenMappingModal={setOpenMappingModal}
              triggerModes={deviceTypesProfilesTriggerModes}
              environments={deviceTypesProfilesEnvironments}
              inputPins={deviceTypesProfilesInputPins}
              outputPins={deviceTypesProfilesOutputPins}
              dataPoints={deviceTypesProfilesDataPoints}
              allIdentifiers={allIdentifiers}
            />
          </Modal>

          <AddMappingForm
            open={openMappingModal}
            onClose={() => {
              setOpenMappingModal(false);
            }}
            dataPoints={deviceTypesProfilesDataPoints}
            identifiers={deviceTypesProfilesIdentifiers}
            triggerModes={deviceTypesProfilesTriggerModes}
            deviceTypeId={deviceTypeId}
            loading={loading}
            identifierLoading={identifierLoading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddDeviceProfileForm;
