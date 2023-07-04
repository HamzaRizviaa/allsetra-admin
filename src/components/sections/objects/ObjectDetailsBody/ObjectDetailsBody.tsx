import { FC } from "react";
import { Grid } from "@mui/material";
import { KeyValueTable } from "@vilocnv/allsetra-core";

const ObjectDetailsBody: FC = () => {
  return (
    <section>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <KeyValueTable title="Object Information" records={{}} />
          <KeyValueTable title="Object Dynamic Fields" records={{}} />
          <KeyValueTable title="Installation Information" records={{}} />
          <KeyValueTable title="Alarm Configuration" records={{}} />
          <KeyValueTable title="Working Hours" records={{}} />
        </Grid>
        <Grid item xs={12} lg={5}></Grid>
      </Grid>
    </section>
  );
};

export default ObjectDetailsBody;
