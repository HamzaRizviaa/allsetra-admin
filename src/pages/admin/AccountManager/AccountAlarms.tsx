import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { useTheme } from "@mui/material";
import { Topbar } from "@vilocnv/allsetra-core";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";

// Data
import { useAppSelector } from "hooks";
import { selectActiveAccountState } from "app/data/selectors";

const AccountAlarms: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Global State
  const { activeAccount } = useAppSelector(selectActiveAccountState);

  return (
    <main>
      <Topbar
        theme={theme}
        title="Account"
        breadcrumbTitle={capitalize(activeAccount?.name) ?? "Go Back"}
        breadcrumbRedirectTo={() => navigate(-1)}
      />
      <AccountTabLayout>
        <div>AccountAlarms</div>
      </AccountTabLayout>
    </main>
  );
};

export default AccountAlarms;
