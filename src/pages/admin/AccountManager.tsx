import { FC, useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Box, Stack, useTheme } from "@mui/material";
import { FormikHelpers } from "formik";
import { Table, Topbar, AddAccountForm, types } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectAllAccounts } from "app/data/selectors";
import {
  getAllAccountsThunk,
  activateAccountThunk,
  deactivateAccountThunk,
  setActiveAccountId,
  createAccountThunk,
} from "app/features";
import { ALL_ACCOUNTS_TABLE_COLUMNS } from "app/data/constants";

const Accounts: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Global State
  const allAccounts = useAppSelector(selectAllAccounts);

  // Local State
  const [open, setOpen] = useState(false); // Boolean state for AddaccountForm Modal

  useEffect(() => {
    dispatch(getAllAccountsThunk());
  }, []);

  const handleViewAccount = (account: any) => {
    dispatch(setActiveAccountId(account.id));
    navigate({
      pathname: "/dashboard/account-manager/details",
      search: createSearchParams({ accountId: account.id }).toString(),
    });
  };

  const handleActivateAccount = async (account: any) => {
    account && dispatch(activateAccountThunk(account.id));
  };

  const handleDeactivateAccount = (account: any) => {
    account && dispatch(deactivateAccountThunk(account.id));
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
              onClick: handleDeactivateAccount,
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
    </Box>
  );
};

export default Accounts;
