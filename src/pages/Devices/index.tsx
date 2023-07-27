import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Topbar } from "@vilocnv/allsetra-core";

// Data
// import { useAppDispatch, useAppSelector } from "hooks";
// import { selectQueriedObjectsState } from "app/data/selectors";
// import { getObjectsByQueryThunk, setActiveObject } from "app/features";
// import { ALL_OBJECTS_TABLE_COLUMNS } from "app/data/constants";

const Devices: FC = () => {
  // const navigate = useNavigate();
  const theme = useTheme();
  // const dispatch = useAppDispatch();

  // Global State
  // const { objects, totalRecords, loading } = useAppSelector(
  //   selectQueriedObjectsState
  // );

  // useDispatchOnParams(getObjectsByQueryThunk);

  // const rowClickHandler = (row: any) => {
  //   dispatch(setActiveObject(row));
  //   navigate({
  //     pathname: `/dashboard/devices/${row.uniqueId}`,
  //   });
  // };

  return (
    <Box>
      <Topbar theme={theme} title="Devices" />
      <Box mx={4}>
        {/* <Table
          columns={ALL_OBJECTS_TABLE_COLUMNS}
          data={objects}
          progressPending={loading}
          paginationTotalRows={totalRecords}
          onRowClicked={rowClickHandler}
          searchPlaceholder="Search object"
        /> */}
      </Box>
    </Box>
  );
};

export default Devices;
