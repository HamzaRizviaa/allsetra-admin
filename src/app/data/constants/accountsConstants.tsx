import { Stack } from "@mui/material";
import { TableColumn, StatusBadge, Badge, types } from "@vilocnv/allsetra-core";

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

export const ACCOUNT_SERVICES_TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
  {
    name: "Service Fields",
    selector: (row: any) => row.fieldsCount,
    sortable: true,
  },
  {
    name: "Linked Device Types",
    selector: (row: any) => row.serviceDeviceTypes,
    format: (row: any) => (
      <Stack my={1} gap={1} flexWrap={"wrap"}>
        {row.serviceDeviceTypes.map(({ deviceType }: any) => (
          <Badge colorScheme="info">{deviceType.deviceName}</Badge>
        ))}
      </Stack>
    ),
  },
  {
    name: "Linked Object Types",
    selector: (row: any) => row.objectTypesCount,
    sortable: true,
  },
];

export const ACCOUNT_DEVICE_TYPES_TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Device Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Manufacturer Name",
    selector: (row: any) => row.deviceManufacturerName || "",
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
  {
    name: "Device Profiles",
    selector: (row: any) => row.deviceProfiles,
    format: (row: any) => (
      <Stack my={1} gap={1} flexWrap={"wrap"}>
        {row.deviceProfiles.map(({ profileName }: any) => (
          <Badge colorScheme="info">{profileName}</Badge>
        ))}
      </Stack>
    ),
    sortable: true,
  },
];

export const ACCOUNT_OBJECT_TYPES_TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
  {
    name: "# of Objects",
    selector: (row: any) => `${row.objectsCount} objects`,
    sortable: true,
  },
  {
    name: "# of Services",
    selector: (row: any) => `${row.servicesCount} services`,
    sortable: true,
  },
  {
    name: "# of Fields",
    selector: (row: any) => `${row.fieldsCount} fields`,
    sortable: true,
  },
];
