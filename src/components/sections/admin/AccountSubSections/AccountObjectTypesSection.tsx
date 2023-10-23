import { FC, useState } from "react";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteConfirmationModal,
  Table,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import AssignObjectTypeForm from "components/forms/accounts/AssignObjectTypeForm/AssignObjectTypeForm";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getAccountObjectTypesThunk,
  removeObjectTypeFromAccountThunk,
} from "app/features";
import { selectAccountObjectTypes } from "app/data/selectors";
import { ACCOUNT_OBJECT_TYPES_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountObjectTypesSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountObjectTypes, totalRecords, loading } = useAppSelector(
    selectAccountObjectTypes
  );

  // Local State
  const [selectedObjectTypeId, setSelectedObjectTypeId] = useState<
    string | null
  >(null);
  const [assignObjectTypeModal, setAssignObjectTypeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountObjectTypesThunk, {
    args: { accountId: accountId || "" },
  });

  const toggleAssignObjectTypeModal = () =>
    setAssignObjectTypeModal(!assignObjectTypeModal);

  const openDeleteConfirmationModal = (objectType: any) => {
    setSelectedObjectTypeId(objectType.uniqueId);
    setOpenDeleteModal(true);
  };

  const removeObjectTypeHandler = () => {
    if (selectedObjectTypeId && accountId) {
      dispatch(
        removeObjectTypeFromAccountThunk({
          accountId,
          objectTypeId: selectedObjectTypeId,
        })
      );
    }

    setOpenDeleteModal(false);
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_OBJECT_TYPES_TABLE_COLUMNS}
        data={accountObjectTypes}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[
          { name: "Remove object type", onClick: openDeleteConfirmationModal },
        ]}
        searchPlaceholder="Search object type"
        primaryButton={{
          text: "Assign object type",
          variant: "outlined",
          startIcon: <AddIcon />,
          onClick: toggleAssignObjectTypeModal,
        }}
      />
      <AssignObjectTypeForm
        open={assignObjectTypeModal}
        onClose={toggleAssignObjectTypeModal}
        accountId={accountId}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to remove a object type from account"
        subTitle="Do you really want to remove this object type from account? This process cannot be undone."
        primaryBtnProps={{ onClick: removeObjectTypeHandler }}
        theme={theme}
      />
    </Box>
  );
};

export default AccountObjectTypesSection;
