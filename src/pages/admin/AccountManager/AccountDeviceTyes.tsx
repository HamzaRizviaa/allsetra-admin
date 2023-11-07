import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { useTheme } from "@mui/material";
import { Topbar } from "@vilocnv/allsetra-core";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";
import AccountDeviceTypesSection from "components/sections/admin/AccountSubSections/AccountDeviceTypesSection";

// Data
import { useAppSelector } from "hooks";
import { selectActiveAccountState } from "app/data/selectors";

const AccountDeviceTyes: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const accountId = params.id;

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
        <AccountDeviceTypesSection
          accountId={activeAccountId ?? accountId ?? ""}
        />
      </AccountTabLayout>
    </main>
  );
};

export default AccountDeviceTyes;
