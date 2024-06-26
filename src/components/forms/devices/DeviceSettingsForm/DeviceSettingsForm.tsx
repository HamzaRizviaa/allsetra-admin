import { FC, useMemo } from "react";
import { Formik, FormikHelpers } from "formik";
import { isEmpty } from "lodash";

// CHILDREN
import InnerForm from "./children/InnerForm";

// DATA
import { useAppDispatch } from "hooks";
import { postUpdateDeviceThunk } from "app/features";
import { IDevices } from "app/data/types";
import { deviceDetailsFormatterForSettingsForm } from "app/data/helpers/devicesHelpers";
import AddMappingForm from "components/forms/common/AddMappingForm/AddMappingForm";

interface Props {
  specificDevice: IDevices | null;
  setOpenMappingModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMappingModal: boolean;
}

const DeviceSettingsForm: FC<Props> = ({
  specificDevice,
  setOpenMappingModal,
  openMappingModal,
}) => {
  const dispatch = useAppDispatch();

  const initialValues = useMemo(
    () =>
      !isEmpty(specificDevice)
        ? deviceDetailsFormatterForSettingsForm(specificDevice)
        : {},
    [specificDevice]
  );

  const saveChangesHandler = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    formikHelpers.setSubmitting(true);

    await dispatch(postUpdateDeviceThunk(values));

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
      <>
        <InnerForm
          specificDevice={specificDevice}
          setOpenMappingModal={setOpenMappingModal}
        />
        <AddMappingForm
          open={openMappingModal}
          onClose={() => setOpenMappingModal(false)}
          dataPoints={[]}
          identifiers={[]}
          triggerModes={[]}
        />
      </>
    </Formik>
  );
};

export default DeviceSettingsForm;
