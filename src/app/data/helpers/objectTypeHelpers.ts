import * as Yup from "yup";
import { isEmpty } from "lodash";
import { IAddObjectType } from "../types";

export const objectTypeDataFormatterForForm = (data: any) => {
  const formattedDevices = data.deviceTypes.map((item: any) => {
    const uniqueId = item.deviceType.uniqueId;

    const formattedItem = {
      [uniqueId]: {
        defaultProfileId: item.defaultProfile.uniqueId,
      },
    };

    return formattedItem;
  });

  const transformedDevices: any = {};

  formattedDevices.forEach((item: any) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    transformedDevices[key] = value;
  });

  const formattedData = data.deviceTypes.map((item: any) => {
    const uniqueId = item.deviceType.uniqueId;

    const formattedItem = {
      [uniqueId]: {
        defaultProfileId: "",
      },
    };

    return formattedItem;
  });

  const transformedData: any = {};

  formattedData.forEach((item: any) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    transformedData[key] = value;
  });

  const payload = {
    name: data.name,
    parentObjectId: data.parentObjectType.uniqueId,
    iconId: data.icon.uniqueId,
    deviceTypes: data.deviceTypes.map((item: any) => item.deviceType.uniqueId),
    deviceProfiles: transformedDevices,
    deviceProfilesData: transformedData,
    services: data.services.map((item: any) => item.uniqueId),
    fields: data.fields.map((item: any) => item.uniqueId),
    uniqueId: data.uniqueId,
  };

  return payload;
};

export const objectTypeDataFormatterForService = (values: any) => {
  const formattedDeviceProfiles = Object.keys(values.deviceProfilesData).map(
    (deviceTypeId) => ({
      deviceTypeId,
      defaultProfileId:
        values.deviceProfiles[deviceTypeId]?.defaultProfileId || "",
    })
  );

  const payload: any = {
    name: values.name,
    iconId: values.iconId,
    deviceTypes: formattedDeviceProfiles,
    fields: values.fields,
    uniqueId: values.uniqueId,
  };

  if (values.parentObjectId) {
    payload.parentObjectId = values.parentObjectId;
    payload.services = values.parentObjectId;
  }

  return payload;
};

export const addObjectTypeInitialValues: IAddObjectType = {
  name: "",
  parentObjectId: "",
  iconId: "",
  deviceTypes: [],
  deviceProfilesData: {},
  fields: [],
  services: [],
};

export const addObjectTypeValidationSchema: Yup.Schema = Yup.object({
  name: Yup.string().trim().required().label("Object name"),
  parentObjectId: Yup.string().trim().label("Parent object type"),
  iconId: Yup.string().trim().required().label("Object type icon"),
  deviceTypes: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Device Types"),
  fields: Yup.array().of(Yup.string()).min(1).required().label("Fields"),
  services: Yup.array()
    .of(Yup.string())
    .label("Supported services")
    .when("parentObjectId", {
      is: (val: string) => !isEmpty(val),
      then: (schema) => schema.min(1).required(),
      otherwise: (schema) => schema,
    }),
});
