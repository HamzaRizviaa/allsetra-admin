import * as Yup from "yup";
import {
  IAccountAssignUser,
  IAccountAssignService,
  IAccountAssignDeviceType,
  IAccountAssignObjectType,
} from "../types";

//
// Account Users Helpers
//
export const accountAssignUserInitialValues: IAccountAssignUser = {
  userEmail: "",
  role: "",
};

export const accountAssignUserValidationSchema: Yup.Schema<IAccountAssignUser> =
  Yup.object({
    userEmail: Yup.string().email().trim().required().label("User email"),
    role: Yup.string().trim().required().label("Role"),
    dallasKey: Yup.string()
      .trim()
      .label("Dallas Key")
      .when("role", {
        is: (val: string) => val === "9efb5cd2-ffc2-4792-9d02-dd33dc6d4c3e",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema,
      }),
  });

//
// Account Serivces Helpers
//
export const accountAssignServiceInitialValues: IAccountAssignService = {
  serviceId: "",
  subscriptions: [],
};

export const accountAssignServiceValidationSchema: Yup.Schema = Yup.object({
  serviceId: Yup.string().trim().required().label("Service"),
  subscriptions: Yup.array().of(Yup.string()).required().label("Subscriptions"),
});

//
// Account Device-Types Helpers
//
export const accountAssignDeviceTypeInitialValues: IAccountAssignDeviceType = {
  deviceTypeId: "",
};

export const accountAssignDeviceTypeValidationSchema: Yup.Schema<IAccountAssignDeviceType> =
  Yup.object({
    deviceTypeId: Yup.string().trim().required().label("Device type"),
  });

//
// Account Object-Types Helpers
//
export const accountAssignObjectTypeInitialValues: IAccountAssignObjectType = {
  objectTypeId: "",
};

export const accountAssignObjectTypeValidationSchema: Yup.Schema<IAccountAssignObjectType> =
  Yup.object({
    objectTypeId: Yup.string().trim().required().label("Object type"),
  });
