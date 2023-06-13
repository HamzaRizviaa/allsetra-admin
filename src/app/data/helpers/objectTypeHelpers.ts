import * as Yup from "yup";
import { IAddObjectType } from "../types";

export const objectTypeDataFormatterForService = (
  values: IAddObjectType,
  deviceTypes: any
) => {
  console.log("Formatter values", values.deviceTypes);
  console.log("DEVICE TYPES", deviceTypes);

  deviceTypes.map((device: any, index: number) => {
    const filteredDevices = deviceTypes.filter(
      (item: any) => item === device[index].deviceProfiles[index].deviceTypeId
    );
    console.log("FILTER", filteredDevices);
  });
};

export const addObjectTypeInitialValues: IAddObjectType = {
  name: "",
  parentObjectId: "",
  iconId: "",
  deviceTypes: [],
  // fields: [],
  services: [],
};

const addObjectTypeToServiceValidationSchema: Yup.Schema = Yup.object({
  deviceTypeId: Yup.string().required(),
  defaultProfileId: Yup.string().required(),
});

export const addObjectTypeValidationSchema: Yup.Schema = Yup.object({
  name: Yup.string().trim().required().label("Object name"),
  parentObjectId: Yup.string().trim().required().label("Parent object type"),
  iconId: Yup.string().trim().required().label("Object type icon"),
  deviceTypes: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Device Types"),
  // fields: Yup.array().of(Yup.string()).min(1).required().label("Fields"),
  services: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Supported services"),
});
