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
};

export const deviceTypeDataFormatter = (deviceType: any) => {
  const devicePicture = !isEmpty(deviceType.imageURL)
    ? [
        {
          url: deviceType?.imageURL,
        },
      ]
    : [];

  const payload = {
    name: deviceType.name,
    devicePicture,
  };

  return payload;
};
