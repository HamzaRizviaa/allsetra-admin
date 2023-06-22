import { FC } from "react";
import { Box } from "@mui/material";
import { ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";

// DATA
import { useAppDispatch } from "hooks";
import { IAlarmSendEmail } from "app/data/types";
import {
  alarmSendEmailInitialValues,
  alarmSendEmailValidationSchema,
} from "app/data/helpers";
import { postAlarmSendEmailThunk } from "app/features";
import InnerForm from "./children/InnerForm";

type Props = Omit<ModalProps, "title" | "children"> & {
  alarmId: string | null;
};

const AlarmSendEmailForm: FC<Props> = ({ open, onClose, alarmId, ...rest }) => {
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (
    values: IAlarmSendEmail,
    formikHelpers: FormikHelpers<IAlarmSendEmail>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      postAlarmSendEmailThunk({ alarmId: alarmId || "", data: values })
    );

    if (type === "alarmDesk/postAlarmSendEmailThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={alarmSendEmailInitialValues}
        validationSchema={alarmSendEmailValidationSchema}
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

export default AlarmSendEmailForm;
