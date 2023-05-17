import { FC } from "react";
import { Formik, Form } from "formik";

// CHILDREN
import GeneralInformationForm from "./children/GeneralInformationForm";
import FinancialInformationForm from "./children/FinancialInformationForm";
import LogisticsForm from "./children/LogisticsForm";
import ManagementForm from "./children/ManagementForm";

const AccountDetailsSection: FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <GeneralInformationForm />
        <FinancialInformationForm />
        <LogisticsForm />
        <ManagementForm />
      </Form>
    </Formik>
  );
};

export default AccountDetailsSection;
