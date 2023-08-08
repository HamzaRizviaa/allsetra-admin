import * as Yup from "yup";

export const addressValidationSchema = Yup.object()
  .shape({
    id: Yup.number(),
    street: Yup.string().label("Street"),
    houseNumber: Yup.string().label("House number"),
    extension: Yup.string().nullable().label("Extension"),
    city: Yup.string().label("City"),
    state: Yup.string().nullable().label("State"),
    postalCode: Yup.string().label("Postal code"),
    phoneNumber: Yup.string().nullable().label("Phone number"),
    email: Yup.string().nullable().label("Email"),
    countryId: Yup.number().nullable().label("Country"),
  })
  .nullable();

export const alarmConfigurationValidationSchema = Yup.object({
  None: Yup.bool().required().label("None"),
  LandBorderCrossing: Yup.bool().required().label("Land Border Crossing"),
  CarAlarm: Yup.bool().required().label("Car Alarm"),
  AwayAlarm: Yup.bool().required().label("Away Alarm"),
  PanicButtonPressed: Yup.bool().required().label("Panic Button Pressed"),
  Movement: Yup.bool().required().label("Movement"),
  ExternalVoltageHigh: Yup.bool().required().label("External Voltage High"),
  BatteryDisconnected: Yup.bool().required().label("Battery Disconnected"),
  IgnitionOn: Yup.bool().required().label("Ignition On"),
});

export const workingHoursValidationSchema = Yup.array().of(
  Yup.object({
    dayOfWeek: Yup.number().required(),
    startTime: Yup.string().required(),
    endTime: Yup.string().required(),
  })
);
