import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { useTheme } from "@mui/material";
import { Topbar } from "@vilocnv/allsetra-core";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";
import AccountUsersSection from "components/sections/admin/AccountSubSections/AccountUsersSection";

// Data
import { useAppSelector } from "hooks";
import { selectActiveAccountState } from "app/data/selectors";

const AccountUsers: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Global State
  const { activeAccount, activeAccountId } = useAppSelector(
    selectActiveAccountState
  );

  return (
    <main>
      <Topbar
        theme={theme}
        title="Account"
        breadcrumbTitle={capitalize(activeAccount?.name) ?? "Go Back"}
        breadcrumbRedirectTo={() => navigate("/dashboard/account-manager")}
      />
      <AccountTabLayout>
        <AccountUsersSection accountId={activeAccountId || ""} />
      </AccountTabLayout>
    </main>
  );
};

export default AccountUsers;
