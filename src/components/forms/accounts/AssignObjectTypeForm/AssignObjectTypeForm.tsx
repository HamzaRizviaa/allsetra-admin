import { FC } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { Modal, ModalProps, FormikSelectField } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import {ObjecttypeBlueIcon} from "assets/icons"

// DATA
import { useAppDispatch } from "hooks";
import { IAccountAssignObjectType } from "app/data/types";
import {
  accountAssignObjectTypeInitialValues,
  accountAssignObjectTypeValidationSchema,
} from "app/data/helpers";
import {
  assignObjectTypeToAccountThunk,
  useGetAvailableObjectTypesForAccountQuery,
} from "app/features";

export type Props = Omit<ModalProps, "title" | "children"> & {
  accountId: string | null;
};

const AssignObjectTypeForm: FC<Props> = ({ open, onClose, accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { data, isLoading } =
    useGetAvailableObjectTypesForAccountQuery(accountId);

  const onSubmitHandler = async (
    values: IAccountAssignObjectType,
    formikHelpers: FormikHelpers<IAccountAssignObjectType>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      assignObjectTypeToAccountThunk({ accountId, data: values })
    );

    if (type === "accounts/assignObjectTypeToAccountThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={accountAssignObjectTypeInitialValues}
        validationSchema={accountAssignObjectTypeValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              title="Assign object type"
              subTitle={"Some description if needed."}
              headerIcon={<ObjecttypeBlueIcon />}
              headerIconBgColor={theme.palette.primary.light}
              primaryBtnProps={{
                type: "submit",
                text: "Assign object type",
                loading: isSubmitting,
                disabled: !isValid,
                // @ts-ignore
                onClick: handleSubmit,
              }}
              secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
              theme={theme}
            >
              <Stack spacing={2}>
                <FormikSelectField
                  label="Object type"
                  name="objectTypeId"
                  options={data}
                  optionLabelKey="name"
                  optionValueKey="uniqueId"
                  loading={isLoading}
                  required
                />
              </Stack>
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AssignObjectTypeForm;
