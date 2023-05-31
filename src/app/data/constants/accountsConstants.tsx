import { TableColumn, StatusBadge, types } from "@vilocnv/allsetra-core";

//
// TABLE HEADERS
//
export const ALL_ACCOUNTS_TABLE_COLUMNS: TableColumn<types.IAccount>[] = [
  { name: "name", selector: (row: types.IAccount) => row.name, sortable: true },
  {
    name: "Status",
    cell: (row: types.IAccount) => (
      <StatusBadge isDeactivated={row.isDeleted} />
    ),
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: types.IAccount) => row.customerType,
    sortable: true,
  },
  {
    name: "# of users",
    selector: (row: types.IAccount) => row.usersCount,
    sortable: true,
  },
];

export const ACCOUNT_USERS_TABLE_COLUMNS: TableColumn<types.IUser>[] = [
  {
    name: "Full name",
    selector: (row: types.IUser) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
    sortable: true,
  },
  { name: "Email", selector: (row: types.IUser) => row.email, sortable: true },
  {
    name: "Status",
    cell: (row: types.IUser) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row: types.IUser) => row.phone,
    sortable: true,
  },
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
