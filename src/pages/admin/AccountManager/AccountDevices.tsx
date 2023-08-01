import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { useTheme } from "@mui/material";
import { Topbar } from "@vilocnv/allsetra-core";
import AccountTabLayout from "components/common/AccountTabLayout/AccountTabLayout";
import AccountDevicesSection from "components/sections/admin/AccountSubSections/AccountDevicesSection";

// Data
import { useAppSelector } from "hooks";
import { selectActiveAccount } from "app/data/selectors";

const AccountDevices: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const accountId = params.id ?? "";

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
        <AccountDevicesSection accountId={accountId} />
      </AccountTabLayout>
    </main>
  );
};

export default AccountDevices;
