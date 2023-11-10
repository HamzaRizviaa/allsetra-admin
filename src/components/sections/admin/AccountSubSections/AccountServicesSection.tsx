import { FC, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteConfirmationModal,
  Table,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import AssignServiceForm from "components/forms/accounts/AssignServiceForm/AssignServiceForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getAccountServicesThunk,
  removeServiceFromAccountThunk,
} from "app/features";
import { selectAccountServices } from "app/data/selectors";
import { ACCOUNT_SERVICES_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountServicesSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountServices, totalRecords, loading } = useAppSelector(
    selectAccountServices
  );

  // Local State
  const [selectedService, setSelectedService] =
    useState<types.IAdminService | null>(null);
  const [assignServiceModal, setAssignServiceModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountServicesThunk, {
    args: { accountId: accountId || "" },
  });

  const toggleAssignServiceModal = () =>
    setAssignServiceModal(!assignServiceModal);

  const editServiceActionHandler = (service: types.IAdminService) => {
    setSelectedService(service);
    toggleAssignServiceModal();
  };

  const openDeleteConfirmationModal = (service: types.IAdminService) => {
    setSelectedService(service);
    setOpenDeleteModal(true);
  };

  const removeServiceHandler = () => {
    if (selectedService && accountId) {
      dispatch(
        removeServiceFromAccountThunk({
          accountId,
          serviceId: selectedService.uniqueId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_SERVICES_TABLE_COLUMNS}
        data={accountServices}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[
          { name: "Edit service", onClick: editServiceActionHandler },
          { name: "Remove service", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search service"
        primaryButton={{
          text: "Assign service",
          variant: "outlined",
          startIcon: <AddIcon />,
          onClick: () => {
            setSelectedService(null);
            toggleAssignServiceModal();
          },
        }}
      />
      <AssignServiceForm
        open={assignServiceModal}
        onClose={toggleAssignServiceModal}
        accountId={accountId}
        service={selectedService}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a service from account"
        subTitle="Do you really want to remove this service from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeServiceHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountServicesSection;
