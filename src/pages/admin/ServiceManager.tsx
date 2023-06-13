import { FC, useState, useCallback } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  Topbar,
  DeleteConfirmationModal,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import ServiceForm from "components/forms/admin/ServiceForm/ServiceForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectServicManagerState } from "app/data/selectors";
import {
  getServicesByQueryThunk,
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
  const [selectedService, setSelectedService] =
    useState<types.IAdminService | null>(null);
  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useDispatchOnParams(getServicesByQueryThunk);

  const openDeleteConfirmationModal = (service: types.IAdminService) => {
    setSelectedService(service);
    setOpenDeleteModal(true);
  };

  const handleActivateService = useCallback((service: types.IAdminService) => {
    dispatch(activateServiceThunk(service?.uniqueId || ""));
  }, []);

  const handleDeactivateService = useCallback(() => {
    selectedService &&
      dispatch(deactivateServiceThunk(selectedService.uniqueId));
    setOpenDeleteModal(false);
  }, [selectedService]);

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Service manager"
        primaryButton={{
          variant: "outlined",
          text: "Add service",
          startIcon: <AddIcon />,
          onClick: () => setOpenServiceForm(true),
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
              when: (row: types.IAdminService) => row.isDeleted === true,
              onClick: handleActivateService,
            },
            {
              name: "Deactivate service",
              when: (row: types.IAdminService) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
          ]}
        />
      </Box>
      <ServiceForm
        open={openServiceForm}
        onClose={() => setOpenServiceForm(false)}
        initialValues={selectedService}
      />
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
