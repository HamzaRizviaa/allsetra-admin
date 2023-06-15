import { FC } from "react";
import { isEmpty } from "lodash";
import { Stack } from "@mui/material";
import { FormikSelectField, FormikInputField } from "@vilocnv/allsetra-core";
import { useFormikContext } from "formik";

// DATA
import { IAccountAssignUser } from "app/data/types";

interface Props {
  roles: Array<any>;
  availableUsers: Array<any> | null;
  availableUsersLoading: boolean;
}

const InnerForm: FC<Props> = ({
  roles,
  availableUsers,
  availableUsersLoading,
}) => {
  const { values } = useFormikContext<IAccountAssignUser>();

  const shouldDisplayDallasKey = () => {
    if (!isEmpty(roles)) {
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
        name="userEmail"
        options={availableUsers || []}
        optionLabelKey="email"
        optionValueKey="email"
        loading={availableUsersLoading}
        required
        searchable
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
