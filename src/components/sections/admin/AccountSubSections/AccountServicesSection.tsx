import { FC, useMemo, useState } from "react";
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
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [assignServiceModal, setAssignServiceModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountServicesThunk, { args: { accountId } });

  const toggleAssignServiceModal = () =>
    setAssignServiceModal(!assignServiceModal);

  const openDeleteConfirmationModal = (service: types.IAdminService) => {
    setSelectedServiceId(service.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeServiceHandler = () => {
    if (selectedServiceId && accountId) {
      dispatch(
        removeServiceFromAccountThunk({
          accountId,
          serviceId: selectedServiceId,
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
          { name: "Remove service", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search service"
        primaryButton={{
          text: "Assign service",
          variant: "outlined",
          startIcon: <AddIcon />,
          onClick: toggleAssignServiceModal,
        }}
      />
      <AssignServiceForm
        open={assignServiceModal}
        onClose={toggleAssignServiceModal}
        accountId={accountId}
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
