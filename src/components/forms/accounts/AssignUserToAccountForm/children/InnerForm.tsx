import { FC } from "react";
import { Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { useFormikContext } from "formik";

// DATA
import { useFetch } from "hooks";
import { IAccountAssignUser } from "app/data/types";
import { AccountsService } from "app/data/services";

interface Props {
  accountId: string | null;
  roles: Array<any>;
}

const InnerForm: FC<Props> = ({ accountId, roles }) => {
  const { values } = useFormikContext<IAccountAssignUser>();

  const { data: availableUsers, loading: availableUsersLoading } = useFetch(
    AccountsService.getAvailableUsersForAccount,
    accountId
  );

  const shouldDisplayDallasKey = () => {
    if (roles) {
      const role = roles.find((role) => role.id === values.role);
      return role ? role.name === "Driver" : false;
    } else {
      return false;
    }
  };

  return (
    <Stack spacing={2}>
      <FormikSelectField
        label="Assigned user email"
        name="userId"
        options={availableUsers}
        optionLabelKey="email"
        optionValueKey="uniqueId"
        emptyOptionsText="There are no available users."
        loading={availableUsersLoading}
        required
      />
      <FormikSelectField
        label="Role"
        name="role"
        options={roles}
        optionLabelKey="name"
        optionValueKey="id"
        required
      />
      {shouldDisplayDallasKey() && (
        <FormikInputField label="Dallas key ID" name="dallasKey" required />
      )}
    </Stack>
  );
};

export default InnerForm;
