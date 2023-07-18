import { FC, useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  DeleteConfirmationModal,
  Table,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getAccountDevicesThunk,
  removeDeviceFromAccountThunk,
} from "app/features";
import { selectAccountDevices } from "app/data/selectors";
import { ACCOUNT_DEVICES_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountDevices: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountDevices, totalRecords, loading } =
    useAppSelector(selectAccountDevices);

  // Local State
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountDevicesThunk, { args: { accountId } });

  const openDeleteConfirmationModal = (device: any) => {
    setSelectedDeviceId(device.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeDeviceHandler = () => {
    if (selectedDeviceId && accountId) {
      dispatch(
        removeDeviceFromAccountThunk({
          accountId,
          deviceId: selectedDeviceId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_DEVICES_TABLE_COLUMNS}
        data={accountDevices ?? []}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[
          { name: "Remove device", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search device"
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a device from account"
        subTitle="Do you really want to remove this device from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeDeviceHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountDevices;
