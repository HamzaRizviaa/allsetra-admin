import { Stack } from "@mui/material";
import { TableColumn, Badge, StatusBadge } from "@vilocnv/allsetra-core";

//
// TABLE HEADERS
//
export const ALL_SERVICES_TABLE_COLUMNS: TableColumn<any>[] = [
  { name: "Service Name", selector: (row: any) => row.name, sortable: true },
  {
    name: "Service Fields",
    selector: (row: any) => row.fields.length,
    sortable: true,
  },
  {
    name: "Linked Device types",
    selector: (row: any) => row.serviceDeviceTypes,
    format: (row: any) => (
      <Stack my={1} gap={1} flexWrap={"wrap"}>
        {row.serviceDeviceTypes.map(({ deviceType }: any) => (
          <Badge colorScheme="info">{deviceType.name}</Badge>
        ))}
      </Stack>
    ),
    sortable: true,
  },
  {
    name: "Linked Object types",
    selector: (row: any) => row.objectTypesCount,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];
