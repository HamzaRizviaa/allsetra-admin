import { FC, useState } from "react";
import { Box } from "@mui/material";
import { TabPanes, TabPanel } from "@vilocnv/allsetra-core";
import { OBJECT_DETAILS_TABLES_HEADINGS } from "app/data/constants";

const ObjectDetailsTables: FC = () => {
  // Local State
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  return (
    <Box mt={8}>
      <TabPanes
        value={tabSelectedIndex}
        onChange={setTabSelectedIndex}
        headings={OBJECT_DETAILS_TABLES_HEADINGS}
      >
        <TabPanel value={tabSelectedIndex} index={0}>
          {/* Object Information */}
          <h1>Object Information</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={1}>
          {/* CAN Bus Data */}
          <h1>CAN Bus Data</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={2}>
          {/* Alarm History */}
          <h1>Alarm History</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={3}>
          {/* Installation History */}
          <h1>Installation History</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={4}>
          {/* Account History */}
          <h1>Account History</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={5}>
          {/* Subscription History */}
          <h1>Subscription History</h1>
        </TabPanel>
      </TabPanes>
    </Box>
  );
};

export default ObjectDetailsTables;
