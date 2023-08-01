import { FC } from "react";
import { Box } from "@mui/material";

// CHILDREN
import GeneralInformationForm from "./children/GeneralInformationForm";
import FinancialInformationForm from "./children/FinancialInformationForm";
import LogisticsForm from "./children/LogisticsForm";
import AlarmConfigurationFormSection from "components/forms/common/AlarmConfigurationFormSection/AlarmConfigurationFormSection";
import ManagementForm from "./children/ManagementForm";

const AccountDetailsSection: FC = () => {
  return (
    <Box>
      <GeneralInformationForm />
      <FinancialInformationForm />
      <LogisticsForm />
      <AlarmConfigurationFormSection />
      <ManagementForm />
    </Box>
  );
};

export default AccountDetailsSection;
