import { FC } from "react";
import { omit } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import InnerForm from "./children/InnerForm";

// DATA
import { useAppDispatch } from "hooks";
import { IAccountAssignUser } from "app/data/types";
import {
  accountAssignUserInitialValues,
  accountAssignUserValidationSchema,
} from "app/data/helpers";
import {
  associateUserToAccountThunk,
  useGetAvailableUsersForAccountQuery,
} from "app/features";

export type Props = Omit<ModalProps, "title" | "children"> & {
  accountId: string | null;
  roles: Array<any>;
};

const AssignUserForm: FC<Props> = ({ open, onClose, accountId, roles }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { data: availableUsers, isLoading: availableUsersLoading } =
    useGetAvailableUsersForAccountQuery(accountId);

  const onSubmitHandler = async (
    values: IAccountAssignUser,
    formikHelpers: FormikHelpers<IAccountAssignUser>
  ) => {
    formikHelpers.setSubmitting(true);

    const userUniqueId =
      availableUsers.find((user: any) => user.email === values.userEmail)
        ?.uniqueId || "";

    const { type } = await dispatch(
      associateUserToAccountThunk({
        accountId,
        userId: userUniqueId,
        data: omit(values, ["userEmail"]),
      })
    );

    if (type === "accounts/associateUserToAccountThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={accountAssignUserInitialValues}
        validationSchema={accountAssignUserValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              title="Assign user"
              primaryBtnProps={{
                type: "submit",
                text: "Assign user",
                loading: isSubmitting,
                disabled: !isValid,
                // @ts-ignore
                onClick: handleSubmit,
              }}
              secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
              theme={theme}
            >
              <InnerForm
                roles={roles}
                availableUsers={availableUsers}
                availableUsersLoading={availableUsersLoading}
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AssignUserForm;
