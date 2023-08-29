import { FC } from "react";
import { Box } from "@mui/material";
import { ModalProps } from "@vilocnv/allsetra-core";
import { Formik, Form, FormikHelpers } from "formik";

// DATA
import { useAppDispatch } from "hooks";
import { IAlarmReportTheft } from "app/data/types";
import {
  alarmReportTheftInitialValues,
  alarmReportTheftValidationSchema,
} from "app/data/helpers";
import { getSpecificAlarmThunk, postAlarmReportTheftThunk } from "app/features";
import InnerForm from "./children/InnerForm";

type Props = Omit<ModalProps, "title" | "children"> & {
  alarmId: string | null;
  generatePDF: () => void;
};

const AlarmReportTheftForm: FC<Props> = ({
  open,
  onClose,
  generatePDF,
  alarmId,
  ...rest
}) => {
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (
    values: IAlarmReportTheft,
    formikHelpers: FormikHelpers<IAlarmReportTheft>
  ) => {
    formikHelpers.setSubmitting(true);

    dispatch(getSpecificAlarmThunk(alarmId || ""));

    const { type } = await dispatch(
      postAlarmReportTheftThunk({ alarmId: alarmId || "", data: values })
    );

    if (type === "alarmDesk/postAlarmReportTheftThunk/fulfilled") {
      generatePDF();
      onClose();
      formikHelpers.resetForm();
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <Box>
      <Formik
        initialValues={alarmReportTheftInitialValues}
        validationSchema={alarmReportTheftValidationSchema}
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

export default AlarmReportTheftForm;
