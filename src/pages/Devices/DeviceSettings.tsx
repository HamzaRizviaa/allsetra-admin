import { FC, Fragment, useState } from "react";
import { PageLoader } from "@vilocnv/allsetra-core";
import DeviceSettingsForm from "components/forms/devices/DeviceSettingsForm/DeviceSettingsForm";

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
            openMappingModal={openMappingModal}
          />
        </Fragment>
      )}
    </div>
  );
};

export default DeviceSettings;
