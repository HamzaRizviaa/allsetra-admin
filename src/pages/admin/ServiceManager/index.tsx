import { FC, useState, useCallback, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { isEmpty } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  Topbar,
  DeleteConfirmationModal,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import ServiceForm from "components/forms/admin/ServiceForm/ServiceForm";

// DATA
import { useAppDispatch, useAppSelector } from "hooks";
import {
  selectServicManagerState,
  selectSpecificServiceState,
} from "app/data/selectors";
import {
  getServicesByQueryThunk,
  deactivateServiceThunk,
  activateServiceThunk,
  getSpecificServiceByIdThunk,
} from "app/features";
import { ALL_SERVICES_TABLE_COLUMNS } from "app/data/constants";
import { formatServiceDataForForm } from "app/data/helpers";

const ServiceManager: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalServices, services, loading } = useAppSelector(
    selectServicManagerState
  );
  const { specificService, specificServiceLoading } = useAppSelector(
    selectSpecificServiceState
  );

  // Local State
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useDispatchOnParams(getServicesByQueryThunk);

  const openDeleteConfirmationModal = (service: types.IAdminService) => {
    setSelectedServiceId(service.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleActivateService = useCallback((service: types.IAdminService) => {
    dispatch(activateServiceThunk(service?.uniqueId || ""));
  }, []);

  const handleDeactivateService = useCallback(() => {
    if (!selectedServiceId) return;
    dispatch(deactivateServiceThunk(selectedServiceId || ""));
    setOpenDeleteModal(false);
  }, [selectedServiceId]);

  const handleAddService = useCallback(() => {
    setSelectedServiceId(null);
    setOpenServiceForm(true);
  }, []);

  const handleEditService = useCallback((service: types.IAdminService) => {
    dispatch(getSpecificServiceByIdThunk(service.uniqueId));
    setSelectedServiceId(service.uniqueId);
    setOpenServiceForm(true);
  }, []);

  const formInitialValues = useMemo(
    () =>
      selectedServiceId && !isEmpty(specificService)
        ? formatServiceDataForForm(specificService)
        : null,
    [selectedServiceId, specificService]
  );

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Service manager"
        primaryButton={{
          variant: "outlined",
          text: "Add service",
          startIcon: <AddIcon />,
          onClick: handleAddService,
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
            { name: "Edit service", onClick: handleEditService },
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
        initialValues={formInitialValues}
        loading={specificServiceLoading}
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
