import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Topbar, Table, useDispatchOnParams } from "@vilocnv/allsetra-core";
import { createSearchParams, useNavigate } from "react-router-dom";

// Data
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import {
  getAllCurrenciesThunk,
  getDeviceTypesByQueryThunk,
  setActiveDeviceTypeId,
} from "app/features";
import { ALL_DEVICETYPES_TABLE_COLUMNS } from "app/data/constants/deviceTypesConstants";
import {
  selectAllCurrencies,
  selectDeviceTypesState,
} from "app/data/selectors";
import { IDeviceType } from "app/data/types";

const DeviceTypes: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Global States
  const { deviceTypes, totalDeviceTypes, loading } = useAppSelector(
    selectDeviceTypesState
  );

  const currencies = useAppSelector(selectAllCurrencies);

  useDispatchOnParams(getDeviceTypesByQueryThunk);

  useDispatchOnMount(
    getAllCurrenciesThunk,
    currencies.length ? undefined : true
  );

  const handleViewDevice = (device: IDeviceType) => {
    dispatch(setActiveDeviceTypeId(device.uniqueId));
    navigate({
      pathname: "/dashboard/device-types/details",
      search: createSearchParams({ deviceTypeId: device.uniqueId }).toString(),
    });
  };

  return (
    <Box>
      <Topbar theme={theme} title="Device types" />
      <Box mx={4}>
        <Table
          columns={ALL_DEVICETYPES_TABLE_COLUMNS}
          data={deviceTypes}
          progressPending={loading}
          paginationTotalRows={totalDeviceTypes}
          searchPlaceholder="Search device type"
          onRowClicked={handleViewDevice}
        />
      </Box>
    </Box>
  );
};

export default DeviceTypes;
