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
  "Groups",
  "Users",
  "Subscriptions",
  "Devices",
  "Objects",
  "Alarms",
  "Installations",
];

export const ACCOUNT_TAB_INDEX_TO_ROUTENAME_MAPPING: Record<number, string> = {
  0: "details",
  1: "services",
  2: "device-types",
  3: "object-types",
  4: "groups",
  5: "users",
  6: "subscriptions",
  7: "devices",
  8: "objects",
  9: "alarms",
  10: "installations",
};

//
// TABLE HEADERS
//
export const ALL_ACCOUNTS_TABLE_COLUMNS: TableColumn<types.IAccount>[] = [
  { name: "Name", selector: (row: types.IAccount) => row.name, sortable: true },
  {
    name: "Type",
    selector: (row: types.IAccount) => row.customerType || "N/A",
    sortable: true,
  },
  {
    name: "# of users",
    selector: (row: types.IAccount) => row.usersCount,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: types.IAccount) => (
      <StatusBadge isDeactivated={row.isDeleted} />
    ),
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
        {row.deviceProfiles.map(({ name }: any) => (
          <Badge colorScheme="info">{name}</Badge>
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

export const ACCOUNT_OBJECTS_TABLE_COLUMNS: TableColumn<types.IObject>[] = [
  {
    name: "Name",
    selector: (row: types.IObject) => row.name,
    sortable: true,
  },
  {
    name: "Object Type",
    //@ts-ignore
    selector: (row: types.IObject) => row.objectTypeName,
    sortable: true,
  },
  {
    name: "A-NR",
    selector: (row: types.IObject) => row.aNumber,
    sortable: true,
  },
  {
    name: "Multiviewer  Name",
    selector: (row: types.IObject) => row.multiviewerName,
    sortable: true,
  },
  {
    name: "Mileage",
    selector: (row: types.IObject) => row.mileage,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: types.IObject) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];

export const ACCOUNT_DEVICES_TABLE_COLUMNS: TableColumn<types.IDevice>[] = [
  {
    name: "Name",
    selector: (row: types.IDevice) => row.name,
    sortable: true,
  },
  {
    name: "Device Type",
    selector: (row: types.IDevice) => row.deviceType?.name || "",
    sortable: true,
  },
  {
    name: "Last Received Network",
    selector: (row: types.IDevice) => row.lastReceivedNetwork,
    sortable: true,
  },
  {
    name: "Last BatteryValue",
    selector: (row: types.IDevice) => row.lastBatteryValue,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: types.IDevice) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];

export const ACCOUNT_INSTALLATIONS_TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Current Step",
    selector: (row: any) => row.currentStep,
    sortable: true,
  },
  {
    name: "Object",
    selector: (row: any) => row.object?.name ?? "",
    sortable: true,
  },
  {
    name: "Object Type",
    selector: (row: any) => row.objectType?.name ?? "",
    sortable: true,
  },
  {
    name: "Device",
    selector: (row: any) => row.device?.name ?? "",
    sortable: true,
  },
  {
    name: "Device Type",
    selector: (row: any) => row.deviceType?.name ?? "",
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];

export const ACCOUNT_SUBSCRIPTIONS_TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Name",
    selector: (row: any) => row.subscription?.name || "",
    sortable: true,
  },
  {
    name: "Duration In Months",
    selector: (row: any) => row.subscription?.durationInMonths || "",
    sortable: true,
  },
  {
    name: "Service Name",
    selector: (row: any) => row.subscription?.service?.name || "",
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: any) => (
      <StatusBadge isDeactivated={row.subscription?.isDeleted} />
    ),
    sortable: true,
  },
];
