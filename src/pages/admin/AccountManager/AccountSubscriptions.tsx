import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { useTheme } from "@mui/material";
import { Topbar, Table, useDispatchOnParams } from "@vilocnv/allsetra-core";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";

// Data
import { useAppSelector } from "hooks";
import {
  selectAccountSubscriptions,
  selectActiveAccountState,
} from "app/data/selectors";
import { getAccountSubscriptionsBySearchThunk } from "app/features";
import { ACCOUNT_SUBSCRIPTIONS_TABLE_COLUMNS } from "app/data/constants";

const AccountSubscriptions: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Global State
  const { activeAccount, activeAccountId } = useAppSelector(
    selectActiveAccountState
  );
  const { totalRecords, accountSubscriptions, loading } = useAppSelector(
    selectAccountSubscriptions
  );

  useDispatchOnParams(getAccountSubscriptionsBySearchThunk, {
    args: { accountId: activeAccountId || "" },
  });

  return (
    <main>
      <Topbar
        theme={theme}
        title="Account"
        breadcrumbTitle={capitalize(activeAccount?.name) ?? "Go Back"}
        breadcrumbRedirectTo={() => navigate(-1)}
      />
      <AccountTabLayout>
        <Table
          columns={ACCOUNT_SUBSCRIPTIONS_TABLE_COLUMNS}
          data={accountSubscriptions ?? []}
          progressPending={loading}
          paginationTotalRows={totalRecords}
          searchPlaceholder="Search subscriptions"
        />
      </AccountTabLayout>
    </main>
  );
};

export default AccountSubscriptions;
