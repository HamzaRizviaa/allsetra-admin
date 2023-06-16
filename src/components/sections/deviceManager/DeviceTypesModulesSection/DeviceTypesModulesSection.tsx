import { FC } from "react";
import { Box } from "@mui/material";
import { Table, useDispatchOnParams } from "@vilocnv/allsetra-core";

// Data
import { useAppSelector } from "hooks";
import { getDeviceTypesModulesThunk } from "app/features";
import { ALL_DEVICETYPESMODULES_TABLE_COLUMNS } from "app/data/constants/deviceTypesConstants";
import { selectDeviceTypesModulesState } from "app/data/selectors";

interface Props {
  deviceTypeId: string | null;
}

const DeviceTypesModulesSection: FC<Props> = ({ deviceTypeId }) => {
  // Global State
  const { loading, totalRecords, deviceTypesModules } = useAppSelector(
    selectDeviceTypesModulesState
  );

  useDispatchOnParams(getDeviceTypesModulesThunk, {
    searchByField: "deviceModule.moduleName",
    args: { deviceTypeId },
  });

  return (
    <Box>
      <Table
        columns={ALL_DEVICETYPESMODULES_TABLE_COLUMNS}
        data={deviceTypesModules}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        searchPlaceholder="Search device type"
      />
    </Box>
  );
};

export default DeviceTypesModulesSection;
