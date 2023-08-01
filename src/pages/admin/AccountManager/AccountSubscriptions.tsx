import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { useTheme } from "@mui/material";
import { Topbar } from "@vilocnv/allsetra-core";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";

// Data
import { useAppSelector } from "hooks";
import { selectActiveAccount } from "app/data/selectors";

const AccountSubscriptions: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const params = useParams();
  // const accountId = params.id ?? "";

  // Global State
  const activeAccount = useAppSelector(selectActiveAccount);

  return (
    <main>
      <Topbar
        theme={theme}
        title="Account"
        breadcrumbTitle={capitalize(activeAccount?.name) ?? "Go Back"}
        breadcrumbRedirectTo={() => navigate(-1)}
      />
      <AccountTabLayout>
        <div>Account Subscriptions</div>
      </AccountTabLayout>
    </main>
  );
};

export default AccountSubscriptions;
