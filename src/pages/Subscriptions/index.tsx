import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";
import { useNavigate } from "react-router-dom";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { getSubscriptionsByQueryThunk } from "app/features";
import { getAllSubscriptionsPageTableColumns } from "app/data/constants";
import { selectSubscriptionsState } from "app/data/selectors";

const Subscriptions: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalSubscriptions, allSubscriptions, totalSubscriptionsLoading } =
    useAppSelector(selectSubscriptionsState);

  useDispatchOnParams(getSubscriptionsByQueryThunk);

  const handleViewSubscription = (subscription: any) => {
    // dispatch(setActiveDevice(device));
    // navigate(`/dashboard/devices/${device.uniqueId}`);
  };

  return (
    <Box>
      <Topbar theme={theme} title="Subscriptions" />
      <Box mx={4}>
        <Table
          columns={getAllSubscriptionsPageTableColumns()}
          data={allSubscriptions}
          progressPending={totalSubscriptionsLoading}
          paginationTotalRows={totalSubscriptions}
          searchPlaceholder="Search subscription"
          onRowClicked={handleViewSubscription}
        />
      </Box>
    </Box>
  );
};

export default Subscriptions;
