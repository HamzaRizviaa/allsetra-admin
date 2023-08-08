import { TableColumn, StatusBadge, Badge } from "@vilocnv/allsetra-core";
import { ISubscription } from "../types/subscriptionManagerTypes";
import { Box } from "@mui/material";
import theme from "app/theme";

//
// TABLE HEADERS
//
export const getAllSubscriptionsTableColumns = (
  subscriptionTypes: Array<any>
): TableColumn<ISubscription>[] => [
  {
    name: "Subscription Name",
    selector: (row: ISubscription) => row.name,
    sortable: true,
  },
  {
    name: "Service Name",
    selector: (row: ISubscription) => row.service.name,
    sortable: true,
  },
  {
    name: "Subscription Type",
    cell: (row: ISubscription) => {
      const subTypeName: string = subscriptionTypes.find(
        (item) => item.id === row.subscriptionType
      )?.name;

      return (
        <Box sx={{ marginRight: "5px" }}>
          <Badge colorScheme="info">{subTypeName}</Badge>
        </Box>
      );
    },
    sortable: true,
  },
  {
    name: "Device types",
    cell: (row: ISubscription) => (
      <>
        {row.deviceTypes.length > 0
          ? row.deviceTypes.map((item) => {
              return (
                <Box sx={{ marginRight: "5px" }}>
                  <Badge colorScheme="info">{item.name}</Badge>
                </Box>
              );
            })
          : "-"}
      </>
    ),
    sortable: true,
  },
  {
    name: "Duration",
    selector: (row: ISubscription) => `${row.durationInMonths} months`,
    sortable: true,
  },
  {
    name: "Monthly Price",
    selector: (row: ISubscription) => (
      <Box color={theme.palette.primary.main}>$ {row.valuePerMonth}</Box>
    ),
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: ISubscription) => <StatusBadge isDeactivated={row.isDeleted} />,
    sortable: true,
  },
];
