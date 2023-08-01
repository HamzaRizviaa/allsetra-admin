import { FC, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteConfirmationModal,
  Table,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import AssignDeviceTypeForm from "components/forms/accounts/AssignDeviceTypeForm/AssignDeviceTypeForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getAccountDeviceTypesThunk,
  removeDeviceTypeFromAccountThunk,
} from "app/features";
import { selectAccountDeviceTypes } from "app/data/selectors";
import { ACCOUNT_DEVICE_TYPES_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountDeviceTypesSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountDeviceTypes, totalRecords, loading } = useAppSelector(
    selectAccountDeviceTypes
  );

  // Local State
  const [selectedDeviceTypeId, setSelectedDeviceTypeId] = useState<
    string | null
  >(null);
  const [assignDeviceTypeModal, setAssignDeviceTypeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountDeviceTypesThunk, { args: { accountId } });

  const toggleAssignDeviceTypeModal = () =>
    setAssignDeviceTypeModal(!assignDeviceTypeModal);

  const openDeleteConfirmationModal = (deviceType: any) => {
    setSelectedDeviceTypeId(deviceType.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeDeviceTypeHandler = () => {
    if (selectedDeviceTypeId && accountId) {
      dispatch(
        removeDeviceTypeFromAccountThunk({
          accountId,
          deviceTypeId: selectedDeviceTypeId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_DEVICE_TYPES_TABLE_COLUMNS}
        data={accountDeviceTypes}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[
          { name: "Remove device type", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search device type"
        primaryButton={{
          text: "Assign device type",
          variant: "outlined",
          startIcon: <AddIcon />,
          onClick: toggleAssignDeviceTypeModal,
        }}
      />
      <AssignDeviceTypeForm
        open={assignDeviceTypeModal}
        onClose={toggleAssignDeviceTypeModal}
        accountId={accountId}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a device type from account"
        subTitle="Do you really want to remove this device type from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeDeviceTypeHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountDeviceTypesSection;
