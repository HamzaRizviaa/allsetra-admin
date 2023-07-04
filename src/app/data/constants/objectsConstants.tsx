import { TableColumn, StatusBadge } from "@vilocnv/allsetra-core";

//
// TABLE HEADERS
//
export const ALL_OBJECTS_TABLE_COLUMNS: TableColumn<any>[] = [
  { name: "Name", selector: (row: any) => row.name, sortable: true },
  {
    name: "A-NR",
    selector: (row: any) => row.aNumber,
    sortable: true,
  },
  {
    name: "Object Type",
    selector: (row: any) => row.objectType?.name || "",
    sortable: true,
  },
  {
    name: "Milage",
    selector: (row: any) => row.mileage,
    sortable: true,
  },
  {
    name: "Attached Devices",
    selector: (row: any) => row.devices?.length || 0,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];

