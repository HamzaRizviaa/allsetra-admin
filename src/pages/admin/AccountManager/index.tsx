import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  createAccountThunk,
  getAccountsByQueryThunk,
  setActiveTabIndex,
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
    dispatch(setActiveTabIndex(0));
    navigate(`/dashboard/account-manager/details/${account.uniqueId}`);
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
