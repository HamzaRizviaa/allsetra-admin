import * as Yup from "yup";
import { IAddService } from "../types";

export const addServiceInitialValues: IAddService = {
  name: "",
  description: "",
  fields: [],
  deviceTypes: [],
};

const addDeviceTypeToServiceValidationSchema: Yup.Schema = Yup.object({
  deviceTypeId: Yup.string().required(),
  requiredModulesId: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Require modules"),
  optionalModulesId: Yup.array()
    .of(Yup.string())
    .required()
    .label("Optional modules"),
});

export const addServiceValidationSchema: Yup.Schema = Yup.object({
  name: Yup.string().trim().required().label("Service name"),
  description: Yup.string().trim().required().label("Service description"),
  fields: Yup.array().of(Yup.string()).min(1).required().label("Fields"),
  deviceTypes: Yup.array()
    .of(addDeviceTypeToServiceValidationSchema)
    .min(1)
    .required()
    .label("Device Types"),
});
