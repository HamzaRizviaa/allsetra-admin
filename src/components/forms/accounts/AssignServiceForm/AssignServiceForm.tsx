import { FC, useMemo } from "react";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Modal, ModalProps, types } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { ServiceBlueIcon } from "assets/icons";
import InnerForm from "./children/InnerForm";

// DATA
import { useAppDispatch } from "hooks";
import { IAccountAssignService } from "app/data/types";
import {
  accountAssignServiceInitialValues,
  accountAssignServiceValidationSchema,
  transformAccountServiceDataForAPI,
  transformAccountServiceDataForForm,
} from "app/data/helpers";
import {
  assignServiceToAccountThunk,
  updateServiceForAccountThunk,
} from "app/features";

export type Props = Omit<ModalProps, "title" | "children"> & {
  accountId: string | null;
  service?: types.IAdminService | null;
};

const AssignServiceForm: FC<Props> = ({
  open,
  onClose,
  accountId,
  service,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isEdit = !isEmpty(service);

  const initialValues = useMemo(() => {
    return isEmpty(service)
      ? accountAssignServiceInitialValues
      : transformAccountServiceDataForForm(service);
  }, [service]);

  const onSubmitHandler = async (
    values: IAccountAssignService,
    formikHelpers: FormikHelpers<IAccountAssignService>
  ) => {
    formikHelpers.setSubmitting(true);

    const data = transformAccountServiceDataForAPI(values);

    if (!isEdit) {
      const { type } = await dispatch(
        assignServiceToAccountThunk({ accountId, data })
      );

      if (type === "accounts/assignServiceToAccountThunk/fulfilled") {
        onClose();
        formikHelpers.resetForm();
      }
    } else {
      const { type } = await dispatch(
        updateServiceForAccountThunk({
          accountId,
          serviceId: service.uniqueId,
          data,
        })
      );

      if (type === "accounts/updateServiceForAccountThunk/fulfilled") {
        onClose();
        formikHelpers.resetForm();
      }
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={accountAssignServiceValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, isValid, resetForm, dirty }) => (
          <Form>
            <Modal
              open={open}
              onClose={onClose}
              title={isEdit ? "Edit Assigned Service" : "Assign Service"}
              subTitle={"Some description if needed."}
              headerIcon={<ServiceBlueIcon />}
              headerIconBgColor={theme.palette.primary.light}
              primaryBtnProps={{
                type: "submit",
                text: isEdit ? "Edit Assigned Service" : "Assign Service",
                loading: isSubmitting,
                disabled: isEdit ? (!dirty ? isValid : !isValid) : !isValid,
                // @ts-ignore
                onClick: handleSubmit,
              }}
              secondaryBtnProps={{
                text: "Cancel",
                onClick: () => {
                  onClose();
                  resetForm();
                },
              }}
              theme={theme}
            >
              <InnerForm service={service} accountId={accountId} />
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AssignServiceForm;
