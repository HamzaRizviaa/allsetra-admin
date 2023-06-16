import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEmpty, capitalize } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Topbar, TabPanes, TabPanel } from "@vilocnv/allsetra-core";

// Data
import { useAppSelector } from "hooks";
import { selectActiveDeviceType } from "app/data/selectors";
import { DEVICETYPES_DETAILS_TABS_HEADINGS } from "app/data/constants/deviceTypesConstants";

// Sections
import DeviceTypesDetailsSection from "components/sections/deviceManager/DeviceTypesDetailsSection/DeviceTypesDetailsSection";
import DeviceTypesProfilesSection from "components/sections/deviceManager/DeviceTypesProfilesSection/DeviceTypesProfilesSection";
import DeviceTypesModulesSection from "components/sections/deviceManager/DeviceTypesModulesSection/DeviceTypesModulesSection";

const DeviceTypeDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deviceTypeId = searchParams.get("deviceTypeId");

  // Global State
  const activeDeviceType = useAppSelector(selectActiveDeviceType);

  // Local State
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (isEmpty(deviceTypeId)) {
      navigate("/dashboard/device-types");
    }
  }, [searchParams]);

  return (
    <main>
      <Topbar
        theme={theme}
        title={activeDeviceType?.name || "Device"}
        breadcrumbTitle="Device types"
        breadcrumbRedirectTo={() => navigate(-1)}
        primaryButton={{
          variant: "contained",
          text: "Save Changes",
          onClick: () => {},
        }}
        secondaryButton={{
          variant: "text",
          text: "Cancel",
          onClick: () => navigate(-1),
        }}
      />
      <Box>
        <TabPanes
          value={tabSelectedIndex}
          onChange={setTabSelectedIndex}
          headings={DEVICETYPES_DETAILS_TABS_HEADINGS}
        >
          <Box mx={2}>
            <TabPanel value={tabSelectedIndex} index={0}>
              <DeviceTypesDetailsSection initialValues={activeDeviceType} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={1}>
              <DeviceTypesProfilesSection deviceTypeId={deviceTypeId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={2}>
              <DeviceTypesModulesSection deviceTypeId={deviceTypeId} />
            </TabPanel>
          </Box>
        </TabPanes>
      </Box>
    </main>
  );
};

export default DeviceTypeDetails;
