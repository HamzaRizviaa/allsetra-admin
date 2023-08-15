import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";
import { useNavigate } from "react-router-dom";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { getDevicesByQueryThunk, setActiveDevice } from "app/features";
import { ALL_DEVICES_TABLE_COLUMNS } from "app/data/constants";
import { selectDevicesState } from "app/data/selectors";
import { IDevices } from "app/data/types";

const Devices: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalDevices, allDevices, loading } =
    useAppSelector(selectDevicesState);

  useDispatchOnParams(getDevicesByQueryThunk);

  const handleViewDevice = (device: IDevices) => {
    dispatch(setActiveDevice(device));
    navigate(`/dashboard/devices/${device.uniqueId}`);
  };

  return (
    <Box>
      <Topbar theme={theme} title="Devices" />
      <Box mx={4}>
        <Table
          columns={ALL_DEVICES_TABLE_COLUMNS}
          data={allDevices}
          progressPending={loading}
          paginationTotalRows={totalDevices}
          searchPlaceholder="Search device"
          onRowClicked={handleViewDevice}
        />
      </Box>
    </Box>
  );
};

export default Devices;
