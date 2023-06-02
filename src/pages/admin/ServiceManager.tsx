import { FC, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormikHelpers } from "formik";
import {
  Table,
  Topbar,
  DeleteConfirmationModal,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import ServiceForm from "components/forms/ServiceForm/ServiceForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectServicManagerState } from "app/data/selectors";
import {
  getServicesByQueryThunk,
  createOrUpdateServiceThunk,
  deactivateServiceThunk,
  activateServiceThunk,
} from "app/features";
import { ALL_SERVICES_TABLE_COLUMNS } from "app/data/constants";

const ServiceManager: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalServices, services, loading } = useAppSelector(
    selectServicManagerState
  );

  // Local State
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useDispatchOnParams(getServicesByQueryThunk);

  const handleActivateService = async (service: any) => {
    service && dispatch(activateServiceThunk(service.uniqueId));
  };

  const openDeleteConfirmationModal = (service: any) => {
    setSelectedServiceId(service.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleDeactivateService = () => {
    selectedServiceId && dispatch(deactivateServiceThunk(selectedServiceId));
    setOpenDeleteModal(false);
  };

  const addAccountHandler = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(createOrUpdateServiceThunk(values));

    if (type === "serviceManager/createOrUpdateServiceThunk/fulfilled") {
      setOpen(false);
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Service manager"
        primaryButton={{
          variant: "outlined",
          text: "Add service",
          startIcon: <AddIcon />,
          onClick: () => setOpen(true),
        }}
      />
      <Box mx={4}>
        <Table
          columns={ALL_SERVICES_TABLE_COLUMNS}
          data={services}
          progressPending={loading}
          paginationTotalRows={totalServices}
          searchPlaceholder="Search service"
          cellActions={[
            {
              name: "Activate service",
              when: (row: types.IAccount) => row.isDeleted === true,
              onClick: handleActivateService,
            },
            {
              name: "Deactivate service",
              when: (row: types.IAccount) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
          ]}
        />
      </Box>
      <ServiceForm open={open} onClose={() => setOpen(false)} />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to delete service"
        subTitle="Do you really want to delete this service? This process cannot be undone."
        theme={theme}
        primaryBtnProps={{ onClick: handleDeactivateService }}
      />
    </Box>
  );
};

export default ServiceManager;
