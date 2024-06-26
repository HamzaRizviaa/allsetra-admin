import { FC, useState } from "react";
import { FormikHelpers } from "formik";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  AddUserForm,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";
import AssignUserForm from "components/forms/accounts/AssignUserForm/AssignUserForm";

// Data
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import {
  getAccountAssociatedUsersThunk,
  getAllRolesThunk,
  removeUserFromAccountThunk,
  createUserAndAssociateToAccountThunk,
} from "app/features";
import { selectAccountUsers, selectAllRoles } from "app/data/selectors";
import { ACCOUNT_USERS_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountUsersSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { accountUsers, loading, totalRecords } =
    useAppSelector(selectAccountUsers);
  const roles = useAppSelector(selectAllRoles);

  // Local State
  const [assignUserModal, setAssignUserModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);

  useDispatchOnParams(getAccountAssociatedUsersThunk, {
    args: { accountId: accountId || "" },
  });

  useDispatchOnMount(getAllRolesThunk, roles.length ? undefined : true);

  const toggleAssignUserModal = () => setAssignUserModal(!assignUserModal);

  const toggleAddUserModal = () => setAddUserModal(!addUserModal);

  const removeUserHandler = (user: any) => {
    user &&
      dispatch(
        removeUserFromAccountThunk({ accountId, userId: user.uniqueId })
      );
  };

  const addUserHandler = async (
    values: types.IAddUser,
    formikHelpers: FormikHelpers<types.IAddUser>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      createUserAndAssociateToAccountThunk({
        accountId,
        values: { ...values, phone: `${values.phone}` },
      })
    );

    if (type === "accounts/createUserAndAssociateToAccountThunk/fulfilled") {
      toggleAddUserModal();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_USERS_TABLE_COLUMNS}
        data={accountUsers}
        progressPending={loading}
        paginationTotalRows={totalRecords}
        cellActions={[{ name: "Remove User", onClick: removeUserHandler }]}
        searchPlaceholder="Search user"
        primaryButton={{
          text: "Add user",
          variant: "outlined",
          startIcon: <AddIcon />,
          onClick: toggleAddUserModal,
        }}
        secondaryButton={{
          text: "Assign user",
          variant: "outlined",
          onClick: toggleAssignUserModal,
        }}
      />
      <AssignUserForm
        open={assignUserModal}
        onClose={toggleAssignUserModal}
        accountId={accountId}
        roles={roles}
      />
      <AddUserForm
        open={addUserModal}
        onClose={toggleAddUserModal}
        onSubmit={addUserHandler}
        roles={roles}
        theme={theme}
      />
    </Box>
  );
};

export default AccountUsersSection;
