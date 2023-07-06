import { TableColumn, StatusBadge, Badge } from "@vilocnv/allsetra-core";
import { IObjectType } from "../types";
import { Box } from "@mui/material";

//
// TABLE HEADERS
//
export const ALL_OBJECT_TYPES_TABLE_COLUMNS: TableColumn<IObjectType>[] = [
  { name: "", selector: (row: IObjectType) => row.name, sortable: true },
  {
    name: "Status",
    cell: (row: IObjectType) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
  {
    name: "Default Profile",
    cell: (row: IObjectType) => (
      <>
        {row.deviceTypes.length > 0
          ? row.deviceTypes.map((item, index) => {
              return (
                <>
                  <Box sx={{ marginLeft: "3px" }}>
                    {item.defaultProfile.profileName}
                  </Box>
                  {index !== row.deviceTypes.length - 1 && ", "}
                </>
              );
            })
          : "-"}
      </>
    ),
    sortable: true,
  },

  {
    name: "# of objects",
    cell: (row: IObjectType) => `${row.deviceTypesCount} objects`,
    sortable: true,
  },
  {
    name: "Supported Devices",
    cell: (row: IObjectType) => (
      <>
        {row.deviceTypes.length > 0
          ? row.deviceTypes.map((item) => {
              return (
                <Box sx={{ marginRight: "5px" }}>
                  <Badge colorScheme="info">{item.deviceType.name}</Badge>
                </Box>
              );
            })
          : "-"}
      </>
    ),
    sortable: true,
  },
];
