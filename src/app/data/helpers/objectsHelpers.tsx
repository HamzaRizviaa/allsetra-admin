import { types, Badge } from "@vilocnv/allsetra-core";

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
    Comments: "No comments",
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