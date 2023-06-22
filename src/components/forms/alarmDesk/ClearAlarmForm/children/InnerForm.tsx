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
import { IClearAlarm } from "app/data/types";
import { useGetClearAlarmReasonsQuery } from "app/features";

type Props = Omit<ModalProps, "title" | "children">;

const InnerForm: FC<Props> = ({ open, onClose, ...rest }) => {
  const theme = useTheme();

  const { resetForm, isSubmitting, isValid, handleSubmit } =
    useFormikContext<IClearAlarm>();

  // @ts-ignore
  const { data: clearAlarmReasons, isLoading } = useGetClearAlarmReasonsQuery();

  const onCloseHandler = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={onCloseHandler}
      title={"Clear Alarm"}
      primaryBtnProps={{
        type: "submit",
        text: "Clear Alarm",
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
          label="Reason"
          name="reason"
          options={clearAlarmReasons || []}
          loading={isLoading}
          optionLabelKey="reason"
          optionValueKey="uniqueId"
        />
        <FormikInputField
          label="Comment"
          name="comment"
          placeholder="Enter comment"
          multiline
          rows={3}
          required
        />
        <FormikCheckbox
          label="Mark comment as priority comment"
          name="isImportant"
        />
        <FormikCheckbox
          label="Set comment on Account level"
          name="isFromAccount"
        />
        <FormikInputField type={"number"} label="Delay" name="delay" />
      </Stack>
    </Modal>
  );
};

export default InnerForm;
