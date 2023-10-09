import { TableColumn, StatusBadge, Badge } from "@vilocnv/allsetra-core";
import { IObjectType } from "../types";
import { Box, Stack } from "@mui/material";

//
// TABLE HEADERS
//
export const ALL_OBJECT_TYPES_TABLE_COLUMNS: TableColumn<IObjectType>[] = [
  { name: "Name", selector: (row: IObjectType) => row.name, sortable: true },
  {
    name: "Supported Devices",
    cell: (row: IObjectType) => (
      <Stack spacing={1}>
        {row.deviceTypes.length > 0
          ? row.deviceTypes.map((item) => (
              <Box sx={{ marginRight: "5px" }}>
                <Badge colorScheme="info">{item.deviceType.name}</Badge>
              </Box>
            ))
          : "N/A"}
      </Stack>
    ),
    sortable: true,
  },
  {
    name: "# of Objects",
    // @ts-ignore
    cell: (row: IObjectType) => `${row.objectsCount || 0} objects`,
    sortable: true,
  },
  {
    name: "# of Fields",
    cell: (row: IObjectType) => `${row.fieldsCount || 0} fields`,
    sortable: true,
  },
  {
    name: "# of Services",
    cell: (row: IObjectType) => `${row.servicesCount || 0} services`,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: IObjectType) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];
