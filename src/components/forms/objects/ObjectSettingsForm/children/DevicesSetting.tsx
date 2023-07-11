import { FC, useState } from "react";
import { useTheme } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  ContentSectionLayout,
  TwoColsLayout,
  types,
  Button,
  DeleteConfirmationModal,
} from "@vilocnv/allsetra-core";
import { ChildFormBox, DeviceName } from "../ObjectSettingsForm.styled";
import { useAppDispatch } from "hooks";
import { disconnectDeviceFromObjectThunk } from "app/features";

interface Props {
  objectId: string;
  devices: Array<types.IDevice>;
}

const DevicesSetting: FC<Props> = ({ objectId, devices }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [openDisconnectModal, setOpenDisconnectModal] =
    useState<boolean>(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onOpenDisconnectModal = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setOpenDisconnectModal(true);
  };

  const onDisconnectClick = async () => {
    setIsLoading(true);

    try {
      await dispatch(
        disconnectDeviceFromObjectThunk({
          objectId,
          deviceId: selectedDeviceId,
        })
      );
    } finally {
      setIsLoading(false);
      setOpenDisconnectModal(false);
    }
  };

  return (
    <ContentSectionLayout
      title="Devices"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        {devices &&
          devices.map((device: types.IDevice, index: number) => (
            <TwoColsLayout key={index}>
              <DeviceName>{device.name}</DeviceName>
              <Button
                variant={"text"}
                color={"error"}
                size={"small"}
                startIcon={<HighlightOffIcon />}
                onClick={() => onOpenDisconnectModal(device.uniqueId)}
              >
                Disconnect
              </Button>
            </TwoColsLayout>
          ))}
      </ChildFormBox>
      <DeleteConfirmationModal
        open={openDisconnectModal}
        onClose={() => setOpenDisconnectModal(false)}
        title="You are about to disconnect the device"
        subTitle="Do you really want to disconnect this device? This process cannot be undone."
        primaryBtnProps={{ onClick: onDisconnectClick, loading: isLoading }}
        theme={theme}
      />
    </ContentSectionLayout>
  );
};

export default DevicesSetting;
