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
import { associateUserToAccountThunk } from "app/features";

export type Props = Omit<ModalProps, "title" | "children"> & {
  accountId: string | null;
  roles: Array<any>;
};

const AssignUserToAccountForm: FC<Props> = ({
  open,
  onClose,
  accountId,
  roles,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (
    values: IAccountAssignUser,
    formikHelpers: FormikHelpers<IAccountAssignUser>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      associateUserToAccountThunk({
        accountId,
        userId: values.userId,
        data: omit(values, ["userId"]),
      })
    );

    if (type === "accounts/associateUserToAccountThunk/fulfilled") {
      onClose();
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
        {({ handleSubmit, isSubmitting }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              title="Assign user"
              primaryBtnProps={{
                type: "submit",
                text: "Assign user",
                loading: isSubmitting,
                // @ts-ignore
                onClick: handleSubmit,
              }}
              secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
              theme={theme}
            >
              <InnerForm accountId={accountId} roles={roles} />
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AssignUserToAccountForm;
