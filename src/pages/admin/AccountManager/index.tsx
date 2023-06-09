import { FC, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormikHelpers } from "formik";
import {
  Table,
  Topbar,
  AddAccountForm,
  DeleteConfirmationModal,
  types,
  useDispatchOnParams,
} from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectAccountsState } from "app/data/selectors";
import {
  activateAccountThunk,
  deactivateAccountThunk,
  setActiveAccountId,
  createAccountThunk,
  getAccountsByQueryThunk,
} from "app/features";
import { ALL_ACCOUNTS_TABLE_COLUMNS } from "app/data/constants";

const Accounts: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const { totalAccounts, allAccounts, loading } =
    useAppSelector(selectAccountsState);

  // Local State
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [open, setOpen] = useState(false); // Boolean state for AddaccountForm Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useDispatchOnParams(getAccountsByQueryThunk);

  const handleViewAccount = (account: types.IAccount) => {
    dispatch(setActiveAccountId(account.uniqueId));
    navigate({
      pathname: "/dashboard/account-manager/details",
      search: createSearchParams({ accountId: account.uniqueId }).toString(),
    });
  };

  const handleActivateAccount = async (account: types.IAccount) => {
    account && dispatch(activateAccountThunk(account.uniqueId));
  };

  const openDeleteConfirmationModal = (account: types.IAccount) => {
    setSelectedAccountId(account.uniqueId);
    setOpenDeleteModal(true);
  };

  const handleDeactivateAccount = () => {
    selectedAccountId && dispatch(deactivateAccountThunk(selectedAccountId));
    setOpenDeleteModal(false);
  };

  const addAccountHandler = async (
    values: types.IAddAccount,
    formikHelpers: FormikHelpers<types.IAddAccount>
  ) => {
    formikHelpers.setSubmitting(true);
    const { type } = await dispatch(createAccountThunk(values));

    if (type === "accounts/createAccountThunk/fulfilled") {
      setOpen(false);
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Account manager"
        primaryButton={{
          variant: "outlined",
          text: "Add account",
          startIcon: <AddIcon />,
          onClick: () => setOpen(true),
        }}
      />
      <Box mx={4}>
        <img
          src={
          'https://afd-identity-b32vqo77nvvyu-hng8fcdzfnfwg3g8.z01.azurefd.net/admin/v1/icons/c9e248e2-8015-4e21-8d1d-50791670ba59/file?X-Subscription=b82594b8-8798-4e62-a945-a493ec71c035'
          }
        />
        <Table
          columns={ALL_ACCOUNTS_TABLE_COLUMNS}
          data={allAccounts}
          progressPending={loading}
          paginationTotalRows={totalAccounts}
          onRowClicked={handleViewAccount}
          searchPlaceholder="Search account"
          cellActions={[
            {
              name: "Activate account",
              when: (row: types.IAccount) => row.isDeleted === true,
              onClick: handleActivateAccount,
            },
            {
              name: "Deactivate account",
              when: (row: types.IAccount) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
          ]}
        />
      </Box>
      <AddAccountForm
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
        onSubmit={addAccountHandler}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="You are about to delete account"
        subTitle="Do you really want to delete this account? This process cannot be undone."
        theme={theme}
        primaryBtnProps={{ onClick: handleDeactivateAccount }}
      />
    </Box>
  );
};

export default Accounts;
