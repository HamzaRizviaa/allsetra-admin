import { StatusBadge, TableColumn } from "@vilocnv/allsetra-core";
import { IField } from "../types";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

//
// TABLE HEADERS
//
export const ALL_FIELD_TABLE_COLUMNS = (fieldTypes: any[]) => {
  const tableColumns: TableColumn<IField>[] = [
    { name: "№", selector: (row: IField) => row.id, sortable: true },
    {
      name: "Field label",
      selector: (row: IField) => row.label,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: IField) => <StatusBadge isDeactivated={row.isDeleted} />,
      sortable: true,
    },
    {
      name: "Field type",
      selector: (row: IField) =>
        fieldTypes.map((type) => {
          if (type.id == row.fieldType) return type.name;
        }),
      sortable: true,
    },
    {
      name: "Max length",
      selector: (row: IField) => row.maxLength,
      sortable: true,
    },
    {
      name: "Field is required",
      cell: (row: IField) =>
        row.isRequired ? (
          <CheckIcon style={{ color: "#148E20" }} />
        ) : (
          <CloseIcon style={{ color: "#CC1010" }} />
        ),
      sortable: true,
    },
    {
      name: "Only numbers",
      cell: (row: IField) =>
        row.onlyNumbers ? (
          <CheckIcon style={{ color: "#148E20" }} />
        ) : (
          <CloseIcon style={{ color: "#CC1010" }} />
        ),
      sortable: true,
    },
  ];

  return tableColumns;
};
