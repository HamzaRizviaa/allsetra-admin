import { FC } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { Table, Topbar, useDispatchOnParams } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueriedObjectsState } from "app/data/selectors";
import { getObjectsByQueryThunk, setActiveObject } from "app/features";
import { ALL_OBJECTS_TABLE_COLUMNS } from "app/data/constants";

const Objects: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { objects, totalRecords, loading } = useAppSelector(
    selectQueriedObjectsState
  );

  useDispatchOnParams(getObjectsByQueryThunk);

  const rowClickHandler = (row: any) => {
    dispatch(setActiveObject(row));
    navigate({
      pathname: "/dashboard/objects/details",
      search: createSearchParams({ objectId: row.uniqueId }).toString(),
    });
  };

  return (
    <Box>
      <Topbar theme={theme} title="Objects" />
      <Box mx={4}>
        <Table
          columns={ALL_OBJECTS_TABLE_COLUMNS}
          data={objects}
          progressPending={loading}
          paginationTotalRows={totalRecords}
          onRowClicked={rowClickHandler}
          searchPlaceholder="Search object"
        />
      </Box>
    </Box>
  );
};

export default Objects;
