import { FC } from "react";
import { Stack, useTheme } from "@mui/material";
import {
  FormikCheckbox,
  FormikInputField,
  Modal,
  ModalProps,
} from "@vilocnv/allsetra-core";
import { useFormikContext } from "formik";
import { IAlarmReportTheft } from "app/data/types";

type Props = Omit<ModalProps, "title" | "children">;

const InnerForm: FC<Props> = ({ open, onClose, ...rest }) => {
  const theme = useTheme();

  const { resetForm, isSubmitting, isValid, handleSubmit } =
    useFormikContext<IAlarmReportTheft>();

  const onCloseHandler = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={onCloseHandler}
      title={"Report Theft"}
      primaryBtnProps={{
        type: "submit",
        text: "Report",
        loading: isSubmitting,
        disabled: !isValid,
        // @ts-ignore
        onClick: handleSubmit,
      }}
      secondaryBtnProps={{
        text: "Cancel",
        onClick: onCloseHandler,
      }}
      theme={theme}
      {...rest}
    >
      <Stack spacing={2}>
        <FormikInputField
          label="Comment"
          name="comment"
          placeholder="Enter comment"
          multiline
          rows={3}
          required
        />
        <FormikCheckbox label="Handle Alarm" name="handleAlarm" />
      </Stack>
    </Modal>
  );
};

export default InnerForm;
