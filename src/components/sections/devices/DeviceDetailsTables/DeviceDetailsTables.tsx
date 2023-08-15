import { FC, useState } from "react";
import { Box } from "@mui/material";
import { TabPanes, TabPanel } from "@vilocnv/allsetra-core";
import { DEVICE_DETAILS_TABLES_HEADINGS } from "app/data/constants";

const DeviceDetailsTables: FC = () => {
  const [tabSelectedIndex, setTabSelectedIndex] = useState(0);

  return (
    <Box mt={8}>
      <TabPanes
        value={tabSelectedIndex}
        onChange={setTabSelectedIndex}
        headings={DEVICE_DETAILS_TABLES_HEADINGS}
      >
        <TabPanel value={tabSelectedIndex} index={0}>
          {/* Device Details */}
          <h1>Device Details</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={1}>
          {/* Object Information */}
          <h1>Object Information</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={2}>
          {/* CAN Bus data */}
          <h1>CAN Bus data</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={3}>
          {/* Device profile */}
          <h1>Device profile</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={4}>
          {/* Subscription History */}
          <h1>Subscription History</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={5}>
          {/* Alarm History */}
          <h1>Alarm History</h1>
        </TabPanel>
        <TabPanel value={tabSelectedIndex} index={6}>
          {/* Installation History */}
          <h1>Installation History</h1>
        </TabPanel>
      </TabPanes>
    </Box>
  );
};

export default DeviceDetailsTables;
