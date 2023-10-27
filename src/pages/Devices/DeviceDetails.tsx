import { FC, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { Topbar, PageLoader } from "@vilocnv/allsetra-core";
import DeviceDetailsHeader from "components/sections/devices/DeviceDetailsHeader/DeviceDeatilsHeader";
import DeviceDetailsBody from "components/sections/devices/DeviceDetailsBody/DeviceDetailsBody";
// import DeviceDetailsTables from "components/sections/devices/DeviceDetailsTables/DeviceDetailsTables";

// Data
import { useActiveDevice, useAppDispatch, useAppSelector } from "hooks";
import { getAllSubscriptionsByObjectIdThunk } from "app/features";
import { selectObjectSubscriptions } from "app/data/selectors";

const DeviceDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { specificDevice, loading } = useActiveDevice();

  const { objectSubscriptions, objectSubscriptionsLoading } = useAppSelector(
    selectObjectSubscriptions
  );

  useEffect(() => {
    if (specificDevice?.object) {
      dispatch(
        getAllSubscriptionsByObjectIdThunk(
          specificDevice?.object?.uniqueId || ""
        )
      );
    }
  }, []);

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Device details"
        breadcrumbTitle="Devices"
        breadcrumbRedirectTo={() => navigate("/dashboard/devices")}
        primaryButton={{
          variant: "contained",
          text: "Settings",
          startIcon: <Settings />,
          onClick: () =>
            navigate(`/dashboard/devices/${specificDevice?.uniqueId}/settings`),
        }}
      />
      <Box mx={4} mt={4}>
        {loading || objectSubscriptionsLoading ? (
          <PageLoader />
        ) : (
          <Fragment>
            <DeviceDetailsHeader
              deviceName={specificDevice?.name || ""}
              status={specificDevice?.status || "None"}
              deviceId={specificDevice?.uniqueId || ""}
              deviceType={specificDevice?.deviceType.name || ""}
            />
            <DeviceDetailsBody
              specificDevice={specificDevice}
              objectSubscriptions={objectSubscriptions ?? []}
            />
            {/* <DeviceDetailsTables /> */}
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default DeviceDetails;
