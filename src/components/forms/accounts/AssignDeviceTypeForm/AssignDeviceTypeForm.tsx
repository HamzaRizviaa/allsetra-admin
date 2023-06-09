import { FC } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { Modal, ModalProps, FormikSelectField } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { DevicetypeBlueIcon } from "assets/icons";

// DATA
import { useAppDispatch } from "hooks";
import { IAccountAssignDeviceType } from "app/data/types";
import {
  accountAssignDeviceTypeInitialValues,
  accountAssignDeviceTypeValidationSchema,
} from "app/data/helpers";
import {
  assignDeviceTypeToAccountThunk,
  useGetAvailableDeviceTypesForAccountQuery,
} from "app/features";

export type Props = Omit<ModalProps, "title" | "children"> & {
  accountId: string | null;
};

const AssignDeviceTypeForm: FC<Props> = ({ open, onClose, accountId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { data, isLoading } =
    useGetAvailableDeviceTypesForAccountQuery(accountId);

  const onSubmitHandler = async (
    values: IAccountAssignDeviceType,
    formikHelpers: FormikHelpers<IAccountAssignDeviceType>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      assignDeviceTypeToAccountThunk({ accountId, data: values })
    );

    if (type === "accounts/assignDeviceTypeToAccountThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={accountAssignDeviceTypeInitialValues}
        validationSchema={accountAssignDeviceTypeValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              title="Assign device type"
              subTitle={"Some description if needed."}
              headerIcon={<DevicetypeBlueIcon />}
              headerIconBgColor={theme.palette.primary.light}
              primaryBtnProps={{
                type: "submit",
                text: "Assign device type",
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
                  label="Device type"
                  name="deviceTypeId"
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

export default AssignDeviceTypeForm;
