import { FC } from "react";
import { useFormikContext } from "formik";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  ContentSectionLayout,
  TwoColsLayout,
  types,
  Button,
} from "@vilocnv/allsetra-core";
import { ChildFormBox, DeviceName } from "../ObjectSettingsForm.styled";

const DevicesSetting: FC = () => {
  const { values } = useFormikContext<types.IObject>();

  return (
    <ContentSectionLayout
      title="Devices"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        {values.devices &&
          values.devices.map((device: any, index: number) => (
            <TwoColsLayout>
              <DeviceName>{device.name}</DeviceName>
              <Button
                variant={"text"}
                color={"error"}
                size={"small"}
                startIcon={<HighlightOffIcon />}
              >
                Disconnect
              </Button>
            </TwoColsLayout>
          ))}
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default DevicesSetting;
