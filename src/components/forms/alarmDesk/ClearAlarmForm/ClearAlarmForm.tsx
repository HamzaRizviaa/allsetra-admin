import { FC } from "react";
import { Box } from "@mui/material";
import { ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";

// DATA
import { useAppDispatch } from "hooks";
import { IClearAlarm } from "app/data/types";
import {
  clearAlarmInitialValues,
  clearAlarmValidationSchema,
} from "app/data/helpers";
import { postClearAlarmThunk } from "app/features";
import InnerForm from "./children/InnerForm";

type Props = Omit<ModalProps, "title" | "children"> & {
  alarmId: string | null;
};

const ClearAlarmForm: FC<Props> = ({ open, onClose, alarmId, ...rest }) => {
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (
    values: IClearAlarm,
    formikHelpers: FormikHelpers<IClearAlarm>
  ) => {
    formikHelpers.setSubmitting(true);

    const { type } = await dispatch(
      postClearAlarmThunk({ alarmId: alarmId || "", data: values })
    );

    if (type === "alarmDesk/postClearAlarmThunk/fulfilled") {
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={clearAlarmInitialValues}
        validationSchema={clearAlarmValidationSchema}
        onSubmit={onSubmitHandler}
        enableReinitialize
        validateOnMount
      >
        <Form>
          <InnerForm open={open} onClose={onClose} {...rest} />
        </Form>
      </Formik>
    </Box>
  );
};

export default ClearAlarmForm;
