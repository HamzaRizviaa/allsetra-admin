import { Grid } from "@mui/material";
import { DeviceCard } from "@vilocnv/allsetra-core";
import { FC } from "react";

interface Props {
  devices: Array<any>;
}

const AttachedDevicesGrid: FC<Props> = ({ devices }) => {
  const onCancelSubscription = (deviceId: string) => {
    console.log({ deviceId });
  };

  return (
    <Grid container spacing={4}>
      {devices &&
        devices.map((device, index: number) => (
          <Grid key={index} item xs={12} md={6}>
            <DeviceCard
              device={device}
              onCancelSubscription={onCancelSubscription}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default AttachedDevicesGrid;
