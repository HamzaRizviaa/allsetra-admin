import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { types, BarChart, LineChart } from "@vilocnv/allsetra-core";

interface Props {}

const ObjectDetailsGraphs: FC<Props> = ({  }) => {
  return (
    <Box mt={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <BarChart data={[]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart data={[]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart data={[]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart data={[]} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ObjectDetailsGraphs;
