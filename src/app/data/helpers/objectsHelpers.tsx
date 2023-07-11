import { types, Badge } from "@vilocnv/allsetra-core";
import { isEmpty, omit } from "lodash";

//
// OBJECT DETAILS PAGE HELPERS
//
export const transformObjectForObjectInfoTable = (
  object: types.IObject | null
): any => {
  if (!object) return {};

  return {
    "Assigned Accounts": object.accounts.map((acc) => acc.name).join(", "),
    "Assigned Users": object.users.map((user) => user.email).join(", "),
    "A-Number": object.aNumber,
    "Multiviewer Name": object.multiviewerName,
    "Object Type": object.objectType.name,
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
  if (!object) return {};

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
    (item) => item.informationType === 0
  );

  const data: any = {};

  dynamicFields.forEach((item: any) => {
    data[item.field.label] = item.value;
  });

  return data;
};

//
// OBJECT SETTINGS PAGE HELPERS
//
export const objectDetailsFormatterForSettingsForm = (
  object: types.IObject | null
) => {
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
    "metadata",
    "status",
    "updatedBy",
    "objectType",
    "owner",
    "devices",
  ]);

  const formattedObject = {
    ...removedUnwantedKeys,
    objectTypeId: object.objectType?.uniqueId ?? "",
    ownerId: object.owner?.uniqueId ?? "",
    accounts: object.accounts?.map((item) => item.uniqueId),
    users: object.users?.map((item) => item.uniqueId),
  };

  return formattedObject;
};
