import { StatusBadge, TableColumn } from "@vilocnv/allsetra-core";
import { IDeviceType, IDeviceTypeModule, IDeviceTypeProfile } from "../types";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

//
// TABLE HEADERS
//
export const ALL_DEVICETYPES_TABLE_COLUMNS: TableColumn<IDeviceType>[] = [
  {
    name: "Picture",
    selector: (row: IDeviceType) => (
      <img src={row.imageURL} alt="Device Picture" />
    ),
    sortable: true,
  },
  {
    name: "Device type name",
    cell: (row: IDeviceType) => row.name,
    sortable: true,
  },
  {
    name: "Device manufacture name",
    selector: (row: IDeviceType) => row.deviceManufacturerName,
    sortable: true,
  },
  {
    name: "Connectivity",
    selector: (row: IDeviceType) => row.connectivity,
    sortable: true,
  },
  {
    name: "Manufacturer",
    cell: (row: IDeviceType) => row.deviceManufacturer.manufacturerName,
    sortable: true,
  },
  {
    name: "Device Price",
    cell: (row: IDeviceType) => "-",
    sortable: true,
  },
  {
    name: "Supports CAN",
    cell: (row: IDeviceType) =>
      row.supportsCAN ? (
        <CheckIcon style={{ color: "#148E20" }} />
      ) : (
        <CloseIcon style={{ color: "#CC1010" }} />
      ),
    sortable: true,
  },
];

export const ALL_DEVICETYPESPROFILE_TABLE_COLUMNS: TableColumn<IDeviceTypeProfile>[] =
  [
    {
      name: "Profile name",
      selector: (row: IDeviceTypeProfile) => row.profileName,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: IDeviceTypeProfile) => (
        <StatusBadge isDeactivated={row.isDeleted} />
      ),
      sortable: true,
    },
    {
      name: "Description",
      cell: (row: IDeviceTypeProfile) => row.description,
      sortable: true,
    },
  ];

export const ALL_DEVICETYPESMODULES_TABLE_COLUMNS: TableColumn<IDeviceTypeModule>[] =
  [
    {
      name: "Module",
      selector: (row: IDeviceTypeModule) => row.moduleName,
      sortable: true,
    },
    {
      name: "Required module",
      cell: (row: IDeviceTypeModule) =>
        row.isRequired ? (
          <CheckIcon style={{ color: "#148E20" }} />
        ) : (
          <CloseIcon style={{ color: "#CC1010" }} />
        ),
      sortable: true,
    },
  ];

//
// TAB PANES HEADINGS
//
export const DEVICETYPES_DETAILS_TABS_HEADINGS: string[] = [
  "Device type",
  "Device profiles",
  "Module list",
];
