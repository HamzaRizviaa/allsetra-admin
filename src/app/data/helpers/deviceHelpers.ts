import { isEmpty } from "lodash";
import * as Yup from "yup";

export const addDeviceTypeFormModalInitialValues = {
  objectName: "",
  objectTypeIcon: "",
  supportedDeviceTypes: "",
};

export const addDeviceTypeValidationSchema: Yup.Schema = Yup.object({
  objectName: Yup.string().trim().required().label("Object name"),
  objectTypeIcon: Yup.string().trim().required().label("Object type icon"),
  supportedDeviceTypes: Yup.string()
    .trim()
    .required()
    .label("Supported device types"),
});

//
// DEVICE TYPES DETAILS PAGE HELPERS
//

export const deviceTypeDetailsInitialValues = {
  name: "",
  devicePicture: [],
  currency: "",
  price: "",
};

export const deviceTypeDetailsValidationSchema = Yup.object({
  name: Yup.string().required().label("Device Name"),
  currency: Yup.string().trim().required().label("Currency"),
  price: Yup.string().trim().required().label("Price"),
  devicePicture: Yup.array()
    .min(1, "You need to upload a file to post device type")
    .required(),
});

export const deviceTypeDataFormatter = (deviceType: any) => {
  const devicePicture = !isEmpty(deviceType.imageURL)
    ? [
        {
          url: deviceType?.imageURL,
        },
      ]
    : [];

  const payload = {
    ...deviceType,
    devicePicture,
  };
  return payload;
};

//
// DEVICE TYPES PROFILES PAGE HELPERS
//

export const deviceTypeProfilesInitialValues = {
  name: "",
  description: "",
  useDriverAuthentication: false,
  useAccelerometerForIgnition: false,
  enableCanbusListening: false,
  reportIntervalInSeconds: -1,
  environment: -1,
  enableInputToOutput: false,
  inputPinId: -1,
  outputPinId: -1,
  triggerMode: -1,
  mappings: [],
};

export const deviceTypeProfilesValidationSchema = Yup.object({
  name: Yup.string().required().label("Profile Name"),
  description: Yup.string().trim().required().label("Description"),
  useDriverAuthentication: Yup.boolean()
    .required()
    .label("Use Driver authentication"),
  useAccelerometerForIgnition: Yup.boolean()
    .required()
    .label("Use accelerometer for ignition"),
  enableCanbusListening: Yup.boolean()
    .required()
    .label("Enable Canbus listening"),
  reportIntervalInSeconds: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .required()
    .label("Unit Report Interval"),
  environment: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .required()
    .label("Environment"),
  enableInputToOutput: Yup.boolean().required().label("Enable Input to output"),
  inputPinId: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .label("Input Pin"),
  outputPinId: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .label("Output Pin"),
  triggerMode: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .required()
    .label("Trigger mode"),

  mappings: Yup.array()
    .of(
      Yup.object({
        dataPointId: Yup.number()
          .integer("Please select the required field")
          .min(0, "Please select the required field")
          .required()
          .label("Data Point"),
        identifierId: Yup.number()
          .integer("Please select the required field")
          .min(0, "Please select the required field")
          .required()
          .label("Identifier"),
        triggerMode: Yup.number()
          .integer("Please select the required field")
          .min(0, "Please select the required field")
          .required()
          .label("Trigger Mode"),
        isInverted: Yup.boolean().required().label("Inverted"),
        dynamicFields: Yup.string()
          .required()
          .label("Operating Time Voltage Threshold"),
      })
    )
    .label("Mappings"),
});

export const getFormattedDeviceProfileData = (device: any | null) => {
  if (isEmpty(device)) return {};

  const formattedDeviceProfile = {
    ...device,
    mappings: device.mappings.map((mapping: any) => {
      return {
        ...mapping,
        dataPointId: mapping.dataPoint.id,
        identifierId: mapping.identifier.id,
      };
    }),
  };

  return formattedDeviceProfile;
};
