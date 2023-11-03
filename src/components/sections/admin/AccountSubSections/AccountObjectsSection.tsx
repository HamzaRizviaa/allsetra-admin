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
  getAccountObjectsThunk,
  removeObjectFromAccountThunk,
} from "app/features";
import { selectAccountObjects } from "app/data/selectors";
import { ACCOUNT_OBJECTS_TABLE_COLUMNS } from "app/data/constants";
import { useNavigate } from "react-router-dom";

interface Props {
  accountId: string | null;
}

const AccountObjectsSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Global State
  const { accountObjects, totalRecords, loading } =
    useAppSelector(selectAccountObjects);

  // Local State
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountObjectsThunk, {
    args: { accountId: accountId || "" },
  });

  const openDeleteConfirmationModal = (object: any) => {
    setSelectedObjectId(object.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeObjectHandler = () => {
    if (selectedObjectId && accountId) {
      dispatch(
        removeObjectFromAccountThunk({
          accountId,
          objectId: selectedObjectId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  const tableColumns = ACCOUNT_OBJECTS_TABLE_COLUMNS(navigate);

  return (
    <Box>
      <Table
        columns={tableColumns}
        data={accountObjects ?? []}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[
          { name: "Remove object", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search object"
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a object from account"
        subTitle="Do you really want to remove this object from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeObjectHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountObjectsSection;
