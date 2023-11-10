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
  getAccountInstallationsThunk,
  removeInstallationFromAccountThunk,
} from "app/features";
import { selectAccountInstallations } from "app/data/selectors";
import { ACCOUNT_INSTALLATIONS_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountInstallationsSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountInstallations, totalRecords, loading } = useAppSelector(
    selectAccountInstallations
  );

  // Local State
  const [selectedInstallationId, setSelectedInstallationId] = useState<
    string | null
  >(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountInstallationsThunk, {
    args: { accountId: accountId || "" },
  });

  const openDeleteConfirmationModal = (installation: any) => {
    setSelectedInstallationId(installation.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeInstallationHandler = () => {
    if (selectedInstallationId && accountId) {
      dispatch(
        removeInstallationFromAccountThunk({
          accountId,
          installationId: selectedInstallationId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_INSTALLATIONS_TABLE_COLUMNS}
        data={accountInstallations ?? []}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[
          { name: "Remove installation", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search installation"
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a installation from account"
        subTitle="Do you really want to remove this installation from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeInstallationHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountInstallationsSection;
