import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Table } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getAccountAssociatedUsersThunk,
  removeUserFromAccountThunk,
} from "app/features";
import { selectActiveAccount, selectCustomerUsers } from "app/data/selectors";
import { ACCOUNT_USERS_TABLE_COLUMNS } from "app/data/constants";

interface Props {
  accountId: string | null;
}

const AccountUsersSection: FC<Props> = ({ accountId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const customerUsers = useAppSelector(selectCustomerUsers);

  useEffect(() => {
    dispatch(getAccountAssociatedUsersThunk(accountId || ""));
  }, [searchParams]);

  const handleRemoveCustomerUser = (user: any) => {
    const customerId = searchParams.get("customerId");
    // user && dispatch(removeCustomerUserThunk({ customerId, userId: user.id }));
  };

  return (
    <Box>
      <Table
        columns={ACCOUNT_USERS_TABLE_COLUMNS}
        rows={customerUsers}
        actions={[{ name: "Remove User", onClick: handleRemoveCustomerUser }]}
        searchPlaceholder="Search user"
        primaryButton={{
          text: "Add user",
          variant: "outlined",
          startIcon: <AddIcon />,
        }}
        secondaryButton={{ text: "Assign user", variant: "outlined" }}
      />
    </Box>
  );
};

export default AccountUsersSection;
