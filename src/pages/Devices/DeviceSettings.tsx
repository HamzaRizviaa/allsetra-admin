import { FC, Fragment, useState } from "react";
import { PageLoader } from "@vilocnv/allsetra-core";
import DeviceSettingsForm from "components/forms/devices/DeviceSettingsForm/DeviceSettingsForm";
import AddMappingForm from "components/forms/common/AddMappingForm/AddMappingForm";

// DATA
import { useActiveDevice } from "hooks";

const DeviceSettings: FC = () => {
  // Global State
  const { specificDevice, loading } = useActiveDevice();

  // Local State
  const [openMappingModal, setOpenMappingModal] = useState(false); // Used for Add Mapping Modal

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <Fragment>
          <DeviceSettingsForm
            specificDevice={specificDevice}
            setOpenMappingModal={setOpenMappingModal}
          />
          <AddMappingForm
            open={openMappingModal}
            onClose={() => setOpenMappingModal(false)}
            dataPoints={[]}
            identifiers={[]}
            triggerModes={[]}
            voltageThresholds={[]}
          />
        </Fragment>
      )}
    </div>
  );
};

export default DeviceSettings;
