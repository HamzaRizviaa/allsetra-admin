import * as Yup from "yup";
import {
  IAlarmReportTheft,
  IClearAlarm,
  IAlarmSendEmail,
  IAlarmSendSMS,
} from "app/data/types";

export const alarmReportTheftInitialValues: IAlarmReportTheft = {
  comment: "",
  handleAlarm: false,
};

export const alarmReportTheftValidationSchema: Yup.Schema<IAlarmReportTheft> =
  Yup.object({
    comment: Yup.string().trim().required().label("Comment"),
    handleAlarm: Yup.bool().required().label("Handle Alarm"),
  });

export const clearAlarmInitialValues: IClearAlarm = {
  reason: "",
  comment: "",
  isImportant: false,
  isFromAccount: false,
  delay: 0,
};

export const clearAlarmValidationSchema: Yup.Schema<IClearAlarm> = Yup.object({
  reason: Yup.string().trim().required().label("Reason"),
  comment: Yup.string().trim().required().label("Comment"),
  isImportant: Yup.bool().required().label("isImportant"),
  isFromAccount: Yup.bool().required().label("isFromAccount"),
  delay: Yup.number().required().label("Delay"),
});

export const alarmSendEmailInitialValues: IAlarmSendEmail = {
  defaultEmails: [],
  additionalEmails: [],
  message: "",
};

export const alarmSendEmailValidationSchema: Yup.Schema = Yup.object({
  defaultEmails: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Default email addresses"),
  additionalEmails: Yup.array()
    .of(Yup.string())
    .required()
    .label("Additional email addresses"),
  message: Yup.string().trim().required().label("Message"),
});

export const alarmSendSMSInitialValues: IAlarmSendSMS = {
  contactPersons: [],
  message: "",
};

export const alarmSendSMSValidationSchema: Yup.Schema = Yup.object({
  contactPersons: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Default email addresses"),
  message: Yup.string().trim().required().label("Message"),
});
