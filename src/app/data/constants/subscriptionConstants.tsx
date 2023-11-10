import { TableColumn, StatusBadge, Badge } from "@vilocnv/allsetra-core";
import { ISubscription } from "../types/subscriptionManagerTypes";
import { Box, Stack } from "@mui/material";
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
    selector: (row: ISubscription) => row.service?.name ?? "N/A",
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
    selector: (row: ISubscription) => `${row.prolongationInMonths} months`,
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

export const getAllSubscriptionsPageTableColumns =
  (): TableColumn<ISubscription>[] => [
    {
      name: "State",
      cell: (row: ISubscription) => (
        <StatusBadge isDeactivated={row.isDeleted} />
      ),
      sortable: true,
    },
    {
      name: "Subscription ID",
      selector: (row: ISubscription) => row?.uniqueId,
      sortable: true,
    },
    {
      name: "Device ID",
      selector: (row: any) => row?.device?.serialNumber || "N/A",
      sortable: true,
    },
    {
      name: "Device Type",
      selector: (row: any) => row?.device?.deviceType?.name || "N/A",
      sortable: true,
    },
    {
      name: "Subscription (Type)",
      cell: (row: any) => (
        <Stack spacing={1}>
          {row?.subscription?.name ? (
            <Box>
              <Badge colorScheme="info">{row?.subscription?.name}</Badge>
            </Box>
          ) : (
            "N/A"
          )}
        </Stack>
      ),
      sortable: true,
    },
    {
      name: "Invoice Owner",
      selector: (row: any) => row?.invoiceOwnerName || "N/A",
      sortable: true,
    },
  ];

export const CONTRACT_TERMS = [
  {
    id: 0,
    name: "1 year",
  },
  {
    id: 1,
    name: "2 years",
  },
  {
    id: 2,
    name: "3 years",
  },
  {
    id: 3,
    name: "5 years",
  },
];
