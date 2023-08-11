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
