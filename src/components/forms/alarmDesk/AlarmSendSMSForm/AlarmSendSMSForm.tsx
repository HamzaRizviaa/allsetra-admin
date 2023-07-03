import { FC } from "react";
import { Box } from "@mui/material";
import { ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";

// DATA
import { useAppDispatch } from "hooks";
import { IAlarmSendSMS } from "app/data/types";
import {
  alarmSendSMSInitialValues,
  alarmSendSMSValidationSchema,
} from "app/data/helpers";
import { postAlarmSendSMSThunk } from "app/features";
import InnerForm from "./children/InnerForm";

type Props = Omit<ModalProps, "title" | "children"> & {
  alarmId: string | null;
};

const AlarmSendSMSForm: FC<Props> = ({ open, onClose, alarmId, ...rest }) => {
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (
    values: IAlarmSendSMS,
    formikHelpers: FormikHelpers<IAlarmSendSMS>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      postAlarmSendSMSThunk({ alarmId: alarmId || "", data: values })
    );

    if (type === "alarmDesk/postAlarmSendSMSThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={alarmSendSMSInitialValues}
        validationSchema={alarmSendSMSValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        <Form>
          <InnerForm
            open={open}
            onClose={onClose}
            alarmId={alarmId}
            {...rest}
          />
        </Form>
      </Formik>
    </Box>
  );
};

export default AlarmSendSMSForm;
