import { types, Badge, helpers } from "@vilocnv/allsetra-core";
import { isEmpty, omit } from "lodash";
import { formatDate } from "./commonHelpers";
import * as Yup from "yup";

//
// OBJECT DETAILS PAGE HELPERS
//
export const transformObjectForObjectInfoTable = (
  object: types.IObject | null
): any => {
  if (!object) return {};

  return {
    "Assigned Accounts": object.accounts?.map((acc) => acc.name).join(", "),
    "Assigned Users": object.users?.map((user) => user.email).join(", "),
    "A-Number": object.aNumber,
    "Multiviewer Name": object.multiviewerName,
    "Object Type": object.objectTypeName,
    Comments: object.comments,
    Milage: object.mileage,
  };
};

const getBadgeForAlarmConfiguration = (state: boolean) => {
  return (
    <Badge colorScheme={state ? "success" : "error"}>
      {state ? "Armed" : "Disarmed"}
    </Badge>
  );
};

export const transformObjectForAlarmConfigTable = (
  object: types.IObject | null
): any => {
  if (isEmpty(object) || isEmpty(object.alarmsConfiguration)) return {};

  return {
    "Land border crossing": getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.LandBorderCrossing
    ),
    "Away alarm": getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.AwayAlarm
    ),
    "Panic button": getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.PanicButtonPressed
    ),
    Movement: getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.Movement
    ),
    "External Voltage High": getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.ExternalVoltageHigh
    ),
    "Battery disconnected": getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.BatteryDisconnected
    ),
    "Ignition on": getBadgeForAlarmConfiguration(
      object.alarmsConfiguration.IgnitionOn
    ),
  };
};

export const transformObjectMetaDataForDynamicFields = (
  object: types.IObject | null
): any => {
  if (!object) return {};
  const dynamicFields = object.metadata.filter(
    (item) => item.informationType === "OBJECT"
  );

  const data: any = {};

  dynamicFields.forEach((item: any) => {
    data[item.field.label] = item.value;
  });

  return data;
};

export const transformObjectMetaDataForInstallationInformation = (
  object: types.IObject | null
): any => {
  if (!object) return {};
  const installationInfo = object.metadata.filter(
    (item) => item.informationType === "INSTALLATION"
  );

  const data: any = {};

  installationInfo.forEach((item: any) => {
    data[item.field.label] = item.value;
  });

  return data;
};

export const transformObjectMetaDataForService = (
  object: types.IObject | null,
  objectSubscriptions: any
): any => {
  if (isEmpty(object) || isEmpty(objectSubscriptions)) return {};

  const serviceFields = object.metadata.filter(
    (item) => item.informationType === "SERVICE"
  );

  const data: any = {};

  const formattedDate = formatDate(objectSubscriptions?.[0].startDate);

  const objectData = {
    "Subscription Name": objectSubscriptions?.[0].subscription.name,
    "Subscription Start": formattedDate,
  };

  data["Subscription Name"] = objectData["Subscription Name"];
  data["Subscription Start"] = objectData["Subscription Start"];

  serviceFields.forEach((item: any) => {
    data[item.field.label] = item.value;
  });

  return data;
};

//
// OBJECT SETTINGS PAGE HELPERS
//
export const objectDetailsFormatterForSettingsForm = (object: any | null) => {
  if (isEmpty(object)) return {};

  const removedUnwantedKeys = omit(object, [
    "created",
    "createdBy",
    "deleted",
    "deletedBy",
    "installations",
    "isDeleted",
    "lastUpdated",
    "location",
    "status",
    "updatedBy",
    "objectType",
    "owner",
    "devices",
    "isWorkingHoursOverriden",
  ]);

  const formattedObject: any = {
    ...removedUnwantedKeys,
    objectTypeId: object.objectType?.uniqueId ?? "",
    alarmOwnerId: object.alarmOwner?.uniqueId ?? "",
    invoiceOwnerId: object.invoiceOwner?.uniqueId ?? "",
    accounts: object.accounts?.map((item: any) => item.uniqueId),
    users: object.users?.map((item: any) => item.uniqueId),
    groups: object.groups?.map((item: any) => item.uniqueId),

    workingHours: {
      // @ts-ignore
      workingHoursSchedule: object.workingHours,
    },
  };

  object.metadata.length &&
    object.metadata.forEach((metadata: any) => {
      formattedObject[metadata.field.label] = metadata.value || "";
    });

  return formattedObject;
};

export const objectDetailsValidationSchema = Yup.object({
  name: Yup.string().required().label("Object Name"),
  objectTypeId: Yup.string().required().label("Object Type"),
  accounts: Yup.array().of(Yup.string()).label("Assigned accounts"),
  users: Yup.array().of(Yup.string()).label("Assigned users"),
  alarmOwnerId: Yup.string().required().label("Alarm Owner"),
  invoiceOwnerId: Yup.string().required().label("Invoice Owner"),
  aNumber: Yup.string().nullable().label("A-Number"),
  multiviewerName: Yup.string().nullable().label("Multiviewer"),
  mileage: Yup.number().nullable().label("Milage"),
  comments: Yup.string().nullable(),
  metadata: Yup.array().nullable(),
  remindersFrom: Yup.number().nullable().label("Reminders From"),
  remindersForEvery: Yup.number().nullable().label("Reminders For Every"),
  reminderEmail: Yup.string().nullable().label("Reminder Email"),
  reminderName: Yup.string().nullable().label("Reminder Name"),
  alarmsConfiguration: helpers.alarmConfigurationValidationSchema,
  notifications: helpers.notificationsConfigurationValidationSchema,
  workingHoursType: Yup.string()
    .nullable()
    .required()
    .label("Working Hours Type"),
  workingHours: Yup.object({
    workingHoursSchedule: helpers.workingHoursValidationSchema,
  }),
  uniqueId: Yup.string(),
});

export const getFormattedPayload = (values: any) => {
  const transformedMetadata: any = [];

  values.metadata.length &&
    values.metadata.forEach((item: any) => {
      if (item.field.label in values)
        transformedMetadata.push({
          fieldUniqueId: item.field.uniqueId,
          value: values[item.field.label],
        });
    });

  return { ...values, metadata: transformedMetadata };
};
