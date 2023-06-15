import { FC, useEffect } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { Modal, ModalProps, FormikSelectField } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { ServiceBlueIcon } from "assets/icons";

// DATA
import { useAppDispatch, useAppSelector } from "hooks";
import { IAccountAssignService } from "app/data/types";
import {
  accountAssignServiceInitialValues,
  accountAssignServiceValidationSchema,
} from "app/data/helpers";
import {
  assignServiceToAccountThunk,
  getAllSubscriptionsThunk,
  useGetAvailableServicesForAccountQuery,
} from "app/features";
import { selectSubscriptionsState } from "app/data/selectors";

export type Props = Omit<ModalProps, "title" | "children"> & {
  accountId: string | null;
};

const AssignServiceForm: FC<Props> = ({ open, onClose, accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { allSubscriptions, loading: subscriptionsLoading } = useAppSelector(
    selectSubscriptionsState
  );

  const { data, isLoading } = useGetAvailableServicesForAccountQuery(accountId);

  useEffect(() => {
    dispatch(getAllSubscriptionsThunk());
  }, []);

  const onSubmitHandler = async (
    values: IAccountAssignService,
    formikHelpers: FormikHelpers<IAccountAssignService>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      assignServiceToAccountThunk({ accountId, data: values })
    );

    if (type === "accounts/assignServiceToAccountThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={accountAssignServiceInitialValues}
        validationSchema={accountAssignServiceValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              title="Assign service"
              subTitle={"Some description if needed."}
              headerIcon={<ServiceBlueIcon />}
              headerIconBgColor={theme.palette.primary.light}
              primaryBtnProps={{
                type: "submit",
                text: "Assign service",
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
                  label="Service type"
                  name="serviceId"
                  options={data || []}
                  optionLabelKey="name"
                  optionValueKey="uniqueId"
                  loading={isLoading}
                  required
                />
                <FormikSelectField
                  label="Subscriptions"
                  name="subscriptions"
                  options={allSubscriptions || []}
                  optionLabelKey="name"
                  optionValueKey="uniqueId"
                  loading={subscriptionsLoading}
                  multiple
                  searchable
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

export default AssignServiceForm;
