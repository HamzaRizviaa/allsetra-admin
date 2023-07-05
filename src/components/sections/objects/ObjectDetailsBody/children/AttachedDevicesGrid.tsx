import { Grid } from "@mui/material";
import { DeviceCard } from "@vilocnv/allsetra-core";
import { FC } from "react";

interface Props {
  devices: Array<any>;
}

const AttachedDevicesGrid: FC<Props> = ({ devices }) => {
  return (
    <Grid container spacing={4}>
      {devices.map((_, index: number) => (
        <Grid key={index} item xs={12} md={6}>
          <DeviceCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default AttachedDevicesGrid;
