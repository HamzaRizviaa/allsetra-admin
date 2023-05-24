import { TableColumnProps } from "@vilocnv/allsetra-core";

//
// TABLE HEADERS
//
export const ALL_ACCOUNTS_TABLE_COLUMNS: TableColumnProps[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "isDeleted", headerName: "Status", flex: 1 },
  { field: "customerType", headerName: "Type", flex: 1 },
  { field: "usersCount", headerName: "# of users", flex: 1 },
];

export const ACCOUNT_USERS_TABLE_COLUMNS: TableColumnProps[] = [
  {
    field: "fullName",
    headerName: "Full name",
    flex: 1,
    valueGetter: (params: any) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone", headerName: "Phone Number", flex: 1 },
];

//
// TAB PANES HEADINGS
//
export const ACCOUNT_DETAILS_TABS_HEADINGS: string[] = [
  "Details",
  "Services",
  "Device Types",
  "Object Types",
  "Users",
  "Devices",
  "Objects",
  "Alarms",
  "Installations",
];
