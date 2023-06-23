import { FC, useMemo } from "react";
import { isEmpty } from "lodash";
import { Box, Theme, useTheme } from "@mui/material";
import { Modal, ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";
import { SubscriptionBlueIcon } from "assets/icons";

// DATA
import { useAppDispatch, useAppSelector } from "hooks";
import InnerForm from "./children/InnerForm";
import { IAddSubscription } from "app/data/types/subscriptionManagerTypes";
import {
  addSubscriptionInitialValues,
  addSubscriptionValidationSchema,
} from "app/data/helpers/subscriptionHelpers";
import { createOrUpdateSubscriptionThunk } from "app/features/subscriptions/subscriptionsActions";
import { resetSpecificSubscription } from "app/features";
import { selectSubscriptionsState } from "app/data/selectors";

export type AddSubscriptionProps = Pick<ModalProps, "open" | "onClose"> & {
  initialValues?: any;
  onSubmit: (
    values: IAddSubscription,
    formikHelpers: FormikHelpers<IAddSubscription>
  ) => void;
  theme: Theme;
};

const SubscriptionForm: FC<AddSubscriptionProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isEdit = initialValues?.uniqueId;
  const text = isEdit ? "Edit subscription" : "Add subscription";

  const { specificSubscriptionLoading } = useAppSelector(
    selectSubscriptionsState
  );

  const formInitialValues = useMemo(
    () =>
      !isEmpty(initialValues) ? initialValues : addSubscriptionInitialValues,
    [initialValues]
  );

  const onSubmitHandler = async (
    values: IAddSubscription,
    formikHelpers: FormikHelpers<IAddSubscription>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(createOrUpdateSubscriptionThunk(values));

    if (type === "subscriptions/createOrUpdateSubscriptionThunk/fulfilled") {
      onClose();
    }

    formikHelpers.setSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    dispatch(resetSpecificSubscription());
  };

  return (
    <Box>
      <Formik
        initialValues={formInitialValues}
        validationSchema={addSubscriptionValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        {({ handleSubmit, isSubmitting, dirty, isValid }) => (
          <Form>
            <Modal
              open={open}
              onClose={handleClose}
              headerIcon={<SubscriptionBlueIcon />}
              headerIconBgColor={theme.palette.primary.light}
              title={text}
              subTitle={"Some description if needed."}
              primaryBtnProps={{
                type: "submit",
                text: text,
                loading: isSubmitting,
                disabled: isEdit ? (!dirty ? isValid : !isValid) : !isValid,
                // @ts-ignore
                onClick: handleSubmit,
              }}
              secondaryBtnProps={{ text: "Cancel", onClick: onClose }}
              theme={theme}
              loading={specificSubscriptionLoading}
            >
              <InnerForm />
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SubscriptionForm;
