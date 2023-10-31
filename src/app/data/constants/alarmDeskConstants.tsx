import { TableColumn, Badge } from "@vilocnv/allsetra-core";
import { capitalize } from "lodash";
import moment from "moment";
import { IAlarm } from "../types";

//
// TABLE HEADERS
//
export const ALL_ALARMS_TABLE_COLUMNS: TableColumn<IAlarm>[] = [
  { name: "A-NR", sortable: true, selector: (row: IAlarm) => row.aNumber || "N/A" },
  {
    name: "Date",
    sortable: true,
    selector: (row: IAlarm) => capitalize(moment(row.created).fromNow()),
  },
  {
    name: "Alarm Type",
    sortable: true,
    selector: (row: IAlarm) => row.alarmType,
  },
  {
    name: "SCM",
    sortable: true,
    selector: (row: IAlarm) => (
      <Badge colorScheme={row.hasScmService ? "success" : "error"}>
        {row.hasScmService ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    name: "Ignition",
    sortable: true,
    cell: (row: IAlarm) => (
      <Badge colorScheme={row.ignitionStatus === 1 ? "success" : "error"}>
        {row.ignitionStatus === 1 ? "On" : "Off"}
      </Badge>
    ),
  },
  {
    name: "Immobiliser",
    sortable: true,
    selector: (row: IAlarm) => (
      <Badge colorScheme={row.hasImmobilizer ? "success" : "error"}>
        {row.hasImmobilizer ? "Yes" : "No"}
      </Badge>
    ),
  },
];

export const ALARM_COMMENTS_TABLE_COLUMNS: TableColumn<any>[] = [
  {
    name: "Commenter",
    sortable: true,
    selector: (row: any) => row.commentedBy,
  },
  {
    name: "Date",
    sortable: true,
    selector: (row: any) => moment(row.date).format("lll"),
  },
  { name: "Note", sortable: true, selector: (row: any) => row.note },
];
