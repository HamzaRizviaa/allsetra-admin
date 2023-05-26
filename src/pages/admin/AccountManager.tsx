import { FC, useState, useEffect } from "react";
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
} from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectAllAccounts } from "app/data/selectors";
import {
  getAllAccountsThunk,
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
  const allAccounts = useAppSelector(selectAllAccounts);

  // Local State
  const [selectedAccountId, setSelectedAccountId] = useState(null); // Boolean state for selected table row
  const [open, setOpen] = useState(false); // Boolean state for AddaccountForm Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Boolean state for DeleteConfirmationModal Modal

  useEffect(() => {
    dispatch(getAllAccountsThunk());
    dispatch(getAccountsByQueryThunk());
  }, []);

  const handleViewAccount = (account: any) => {
    dispatch(setActiveAccountId(account.uniqueId));
    navigate({
      pathname: "/dashboard/account-manager/details",
      search: createSearchParams({ accountId: account.uniqueId }).toString(),
    });
  };

  const handleActivateAccount = async (account: any) => {
    account && dispatch(activateAccountThunk(account.uniqueId));
  };

  const openDeleteConfirmationModal = (account: any) => {
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
        title="Accounts"
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
          rows={allAccounts ?? []}
          searchPlaceholder="Search account"
          actions={[
            { name: "View Account", onClick: handleViewAccount },
            {
              name: "Activate account",
              when: (row) => row.isDeleted === true,
              onClick: handleActivateAccount,
            },
            {
              name: "Deactivate account",
              when: (row) => row.isDeleted === false,
              onClick: openDeleteConfirmationModal,
            },
          ]}
          // @ts-ignore
          getRowId={(row: any) => row.uniqueId}
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
