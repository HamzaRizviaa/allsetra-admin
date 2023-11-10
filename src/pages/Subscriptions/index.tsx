import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";

// Data
import { useAppSelector } from "hooks";
import { getDeviceSubscriptionsByQueryThunk } from "app/features";
import { getAllSubscriptionsPageTableColumns } from "app/data/constants";
import { selectDeviceSubscriptionsState } from "app/data/selectors";

const Subscriptions: FC = () => {
  const theme = useTheme();

  // Global State
  const {
    deviceSubscriptions,
    totalDeviceSubscriptions,
    totalDeviceSubscriptionsLoading,
  } = useAppSelector(selectDeviceSubscriptionsState);

  useDispatchOnParams(getDeviceSubscriptionsByQueryThunk);

  return (
    <Box>
      <Topbar theme={theme} title="Subscriptions" />
      <Box mx={4}>
        <Table
          columns={getAllSubscriptionsPageTableColumns()}
          data={deviceSubscriptions}
          progressPending={totalDeviceSubscriptionsLoading}
          paginationTotalRows={totalDeviceSubscriptions}
          searchPlaceholder="Search subscription"
        />
      </Box>
    </Box>
  );
};

export default Subscriptions;
