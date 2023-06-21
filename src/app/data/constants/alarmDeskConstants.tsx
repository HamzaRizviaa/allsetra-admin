import { TableColumn, Badge } from "@vilocnv/allsetra-core";
import moment from "moment";

//
// TABLE HEADERS
//
export const ALL_ALARMS_TABLE_COLUMNS: TableColumn<any>[] = [
  { name: "A-NR", sortable: true, selector: (row: any) => row.aNumber },
  {
    name: "Date",
    sortable: true,
    selector: (row: any) => moment().toNow(row.created),
  },
  { name: "Alarm Type", sortable: true, selector: (row: any) => row.alarmType },
  { name: "SCM", sortable: true, selector: (row: any) => row.hasScmService },
  {
    name: "Positon",
    sortable: true,
    selector: (row: any) => row.location,
  },
  {
    name: "Ignition",
    sortable: true,
    cell: (row: any) => (
      <Badge colorScheme={row.ignitionStatus === 1 ? "success" : "error"}>
        {row.ignitionStatus === 1 ? "On" : "Off"}
      </Badge>
    ),
  },
  { name: "Battery", sortable: true },
  {
    name: "Immobiliser",
    sortable: true,
    selector: (row: any) => row.hasImmobilizer,
  },
];
