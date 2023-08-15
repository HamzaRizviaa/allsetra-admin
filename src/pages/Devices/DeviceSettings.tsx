import { FC } from "react";
import { PageLoader } from "@vilocnv/allsetra-core";
import DeviceSettingsForm from "components/forms/devices/DeviceSettingsForm/DeviceSettingsForm";

// DATA
import { useActiveDevice } from "hooks";

const DeviceSettings: FC = () => {
  const { specificDevice, loading } = useActiveDevice();

  return (
    <div>
      {loading ? (
        <PageLoader />
      ) : (
        <DeviceSettingsForm specificDevice={specificDevice} />
      )}
    </div>
  );
};

export default DeviceSettings;
