import * as Yup from "yup";
import {
  IAlarmReportTheft,
  IClearAlarm,
  IAlarmSendEmail,
  IAlarmSendSMS,
} from "app/data/types";
import { types, Badge } from "@vilocnv/allsetra-core";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

//
// ALARM DESK FORMS HELPERS
//
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

//
// ALARM DESK METADATA KEYVALUE TABLE HELPERS
//

export const transformAlarmForObjectInfoTable = (alarm: types.IAlarm) => {
  if (!alarm) return {};

  return {
    "A number": alarm.object?.aNumber ?? "",
    "Object Name": alarm.object?.name ?? "",
    Immobiliser: (
      <Badge colorScheme={alarm.hasImmobilizer ? "success" : "error"}>
        {alarm.hasImmobilizer ? "Yes" : "No"}
      </Badge>
    ),
  };
};

export const transformAlarmPersonsForTable = (alarmPersons: Array<any>) => {
  if (isEmpty(alarmPersons)) return {};

  const data: any = {};

  alarmPersons.forEach((person) => {
    data[`${person.firstName} ${person.lastName}`] = (
      <Link to={`tel:${person.phone}`}>
        <LocalPhoneIcon sx={{ width: "18px", height: "18px" }} />
      </Link>
    );
  });

  return data;
};

export const transformOwnerForCompanyInformation = (object: types.IObject) => {
  if (isEmpty(object)) return {};

  const { visitingAddress } = object.owner;

  const data: any = {
    "Company name": object.owner?.name || "",
    Address: `House #: ${visitingAddress.houseNumber}, Street: ${visitingAddress.street}, City: ${visitingAddress.city}, State: ${visitingAddress.state}`,
    Status: (
      <Badge
        colorScheme={object.owner.status === "ACTIVE" ? "success" : "error"}
      >
        {object.owner.status}
      </Badge>
    ),
  };

  return data;
};

export const transformOwnerCountriesForWhitelisted = (
  object: types.IObject
) => {
  if (isEmpty(object)) return {};

  const data: any = {};

  object.owner.countries.map((countryWhitelist: any) => {
    data[countryWhitelist.name] = "";
  });

  return data;
};
