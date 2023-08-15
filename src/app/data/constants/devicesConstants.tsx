import { TableColumn } from "@vilocnv/allsetra-core";
import { IDevices } from "../types";

//
// TABLE HEADERS
//
export const ALL_DEVICES_TABLE_COLUMNS: TableColumn<IDevices>[] = [
  {
    name: "Device ID",
    selector: (row: IDevices) => row.name,
    sortable: true,
  },
  {
    name: "device type",
    selector: (row: IDevices) => row.deviceType.name,
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row: IDevices) => "-",
    sortable: true,
  },
  {
    name: "Object name",
    selector: (row: IDevices) => row.object?.name,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row: IDevices) => "-",
    sortable: true,
  },
  {
    name: "Communication timestamp",
    selector: (row: IDevices) => "-",
    sortable: true,
  },
];

export const DEVICEIOMAPPING__TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Data point",
    selector: (row: any) => row.dataPoint,
    sortable: true,
  },
  {
    name: "Identifier",
    selector: (row: IDevices) => "-",
    sortable: true,
  },
  {
    name: "Trigger Mode",
    selector: (row: IDevices) => "-",
    sortable: true,
  },
  {
    name: "Dynamic Fields",
    selector: (row: IDevices) => "-",
    sortable: true,
  },
];

//
// DEVICE DETAILS
//
export const DEVICE_DETAILS_TABLES_HEADINGS: string[] = [
  "Device Details",
  "Object Information",
  "CAN Bus Data",
  "Device profile",
  "Subscription History",
  "Alarm History",
  "Installation History",
];
