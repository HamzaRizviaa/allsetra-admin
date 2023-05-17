import { TableColumnProps } from "@vilocnv/allsetra-core";

//
// TABLE HEADERS
//
export const ALL_ACCOUNTS_TABLE_COLUMNS: TableColumnProps[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "createdBy", headerName: "Created By", flex: 1 },
  { field: "isDeleted", headerName: "Is Deactivated", flex: 1 },
];

export const ACCOUNT_USERS_TABLE_COLUMNS: TableColumnProps[] = [
  { field: "name", headerName: "Name", flex: 1 },
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
