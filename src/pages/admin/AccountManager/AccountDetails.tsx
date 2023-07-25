import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEmpty, capitalize } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Topbar, TabPanes, TabPanel } from "@vilocnv/allsetra-core";

// Data
import { useAppSelector } from "hooks";
import { selectActiveAccount } from "app/data/selectors";
import { ACCOUNT_DETAILS_TABS_HEADINGS } from "app/data/constants";

// Sections
import AccountDetailsSection from "components/sections/admin/AccountDetailsSection/AccountDetailsSection";
import AccountServices from "components/sections/admin/AccountSubSections/AccountServices";
import AccountDeviceTypes from "components/sections/admin/AccountSubSections/AccountDeviceTypes";
import AccountObjectTypes from "components/sections/admin/AccountSubSections/AccountObjectTypes";
import AccountUsers from "components/sections/admin/AccountSubSections/AccountUsers";
import AccountDevices from "components/sections/admin/AccountSubSections/AccountDevices";
import AccountObjects from "components/sections/admin/AccountSubSections/AccountObjects";
import AccountInstallations from "components/sections/admin/AccountSubSections/AccountInstallations";

const AccountDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams.get("accountId");

  // Global State
  const activeAccount = useAppSelector(selectActiveAccount);

  // Local State
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (isEmpty(accountId)) {
      navigate("/dashboard/account-manager");
    }
  }, [searchParams]);

  return (
    <main>
      <Topbar
        theme={theme}
        title="Account"
        breadcrumbTitle={capitalize(activeAccount?.name) ?? "Go Back"}
        breadcrumbRedirectTo={() => navigate(-1)}
        {...(tabSelectedIndex === 0
          ? {
              primaryButton: {
                variant: "contained",
                text: "Save Changes",
                onClick: () => {},
              },
              secondaryButton: {
                variant: "text",
                text: "Cancel",
                onClick: () => {},
              },
            }
          : null)}
      />
      <Box>
        <TabPanes
          value={tabSelectedIndex}
          onChange={setTabSelectedIndex}
          headings={ACCOUNT_DETAILS_TABS_HEADINGS}
          onHeadingClick={(heading) => {
            console.log(heading);
          }}
        >
          <Box mx={2}>
            <TabPanel value={tabSelectedIndex} index={0}>
              {/* Details */}
              <AccountDetailsSection /> /
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={1}>
              {/* Services */}
              <AccountServices accountId={accountId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={2}>
              {/* Device Types */}
              <AccountDeviceTypes accountId={accountId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={3}>
              {/* Object Types */}
              <AccountObjectTypes accountId={accountId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={4}>
              {/* Groups */}
              <h1>Groups</h1>
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={5}>
              {/* Users */}
              <AccountUsers accountId={accountId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={6}>
              {/* Subscriptions */}
              <h1>Subscriptions</h1>
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={7}>
              {/* Devices */}
              <AccountDevices accountId={accountId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={8}>
              {/* Objects */}
              <AccountObjects accountId={accountId} />
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={9}>
              {/* Alarms */}
              <h1>Alarms</h1>
            </TabPanel>
            <TabPanel value={tabSelectedIndex} index={10}>
              {/* Installations */}
              <AccountInstallations accountId={accountId} />
            </TabPanel>
          </Box>
        </TabPanes>
      </Box>
    </main>
  );
};

export default AccountDetails;
