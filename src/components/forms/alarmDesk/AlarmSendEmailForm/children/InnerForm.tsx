import { FC } from "react";
import { Stack, useTheme } from "@mui/material";
import {
  FormikCheckbox,
  FormikInputField,
  FormikSelectField,
  Modal,
  ModalProps,
} from "@vilocnv/allsetra-core";
import { useFormikContext } from "formik";
import { IAlarmSendEmail } from "app/data/types";
import { useGetAlarmPersonsForAlarmQuery } from "app/features";

type Props = Omit<ModalProps, "title" | "children"> & {
  alarmId: string | null;
};

const InnerForm: FC<Props> = ({ open, onClose, alarmId, ...rest }) => {
  const theme = useTheme();

  const { resetForm, isSubmitting, isValid, handleSubmit } =
    useFormikContext<IAlarmSendEmail>();

  const { data, isLoading } = useGetAlarmPersonsForAlarmQuery(alarmId || "");

  const onCloseHandler = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={onCloseHandler}
      title={"Send Email"}
      primaryBtnProps={{
        type: "submit",
        text: "Send",
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
        <FormikSelectField
          label="Default email addresses"
          name="defaultEmails"
          options={data}
          optionLabelKey={"email"}
          optionValueKey={"email"}
          loading={isLoading}
          multiple
          searchable
        />
        <FormikInputField
          label="Message"
          name="message"
          placeholder="Enter message"
          multiline
          rows={3}
          required
        />
      </Stack>
    </Modal>
  );
};

export default InnerForm;
