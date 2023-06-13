import * as Yup from "yup";
import { omit } from "lodash";
import { IAddService } from "../types";

export const addServiceInitialValues: IAddService = {
  name: "",
  description: "",
  fields: [],
  deviceTypes: [],
  deviceModules: {},
};

export const addServiceValidationSchema: Yup.Schema = Yup.object({
  name: Yup.string().trim().required().label("Service name"),
  description: Yup.string().trim().required().label("Service description"),
  fields: Yup.array().of(Yup.string()).min(1).required().label("Fields"),
  deviceTypes: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Device Types"),
});

export const formatServiceFormDataForApi = (values: IAddService) => {
  const deviceTypes = values.deviceTypes.map((deviceTypeId: string) => ({
    deviceTypeId: deviceTypeId,
    requiredModulesId: values.deviceModules[deviceTypeId].requiredModulesId,
    optionalModulesId: values.deviceModules[deviceTypeId].optionalModulesId,
  }));

  return omit(
    {
      ...values,
      deviceTypes,
    },
    ["deviceModules"]
  );
};
