import * as Yup from "yup";
import { isEmpty, omit } from "lodash";
import {
  IAccountAssignUser,
  IAccountAssignService,
  IAccountAssignDeviceType,
  IAccountAssignObjectType,
} from "../types";
import { transformAddressObjectForForm } from "./commonHelpers";
import { helpers } from "@vilocnv/allsetra-core";

//
// Account Details Helpers
//
export const accountDetailsFormatterForForm = (account: any) => {
  if (isEmpty(account)) return {};

  const removedUnwantedKeys = omit(account, [
    "created",
    "createdBy",
    "deleted",
    "deletedBy",
    "isDeleted",
    "lastUpdated",
    "status",
    "updatedBy",
    "owner",
    "devices",
    "usersCount",
    "objectsCount",
    "linkedObjects",
    "countries",
    "accountOwner",
  ]);

  const formattedObject = {
    ...removedUnwantedKeys,
    accountIndustry: account.accountIndustry?.id,
    accountType: account.accountType?.id,
    accountOwnerUniqueId: account.accountOwner,
    workingHours: {
      workingHoursSchedule: account.workingHours,
    },
    billingAddress: transformAddressObjectForForm(account.billingAddress),
    shippingAddress: transformAddressObjectForForm(account.shippingAddress),
    visitingAddress: transformAddressObjectForForm(account.visitingAddress),
  };

  return formattedObject;
};

export const accountDetailsValidationSchema = Yup.object().shape({
  uniqueId: Yup.string(),
  name: Yup.string().required().label("Name"),
  debtorNumber: Yup.string().nullable().label("Debtor number"),
  resellerReference: Yup.string().nullable().label("Reseller Reference"),
  customerType: Yup.string().nullable().label("Customer Type"),
  website: Yup.string().nullable().label("Website"),
  phoneNumber: Yup.string().nullable().label("Phone number"),
  kvkcocNumber: Yup.string().nullable().label("KVK number"),
  description: Yup.string().nullable().label("Description"),
  workingHoursType: Yup.string().label("Working Hours Type"),
  accountNumber: Yup.string().nullable().label("Account number"),
  accountType: Yup.string().nullable(),
  accountIndustry: Yup.string().nullable(),
  boboid: Yup.string().nullable().label("BOBO ID"),
  notes: Yup.string().nullable().label("Notes"),
  accountOwner: Yup.string().nullable().label("Account owner"),
  multiViewerId: Yup.string().nullable().label("Multi-viewer ID"),
  afasDebitNumber: Yup.string().nullable().label("AFAS Debit number"),
  billingAddress: helpers.addressValidationSchema,
  bankAccount: Yup.string().nullable().label("AFAS Debit number"),
  vatNumber: Yup.string().nullable().label("VAT number"),
  vatShifted: Yup.string().nullable().label("VAT shifted"),
  paymentTermInDays: Yup.string().nullable().label("Payment term"),
  paymentMethod: Yup.string().nullable().label("Payment method"),
  visitingAddress: helpers.addressValidationSchema,
  shippingAddress: helpers.addressValidationSchema,
  alarmsConfiguration: helpers.alarmConfigurationValidationSchema,
  workingHours: Yup.object({
    workingHoursSchedule: helpers.workingHoursValidationSchema,
  }),
});

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
  subscriptionsPricing: {},
};

export const accountAssignServiceValidationSchema: Yup.Schema = Yup.object({
  serviceId: Yup.string().trim().required().label("Service"),
  subscriptions: Yup.array().of(Yup.string()).required().label("Subscriptions"),
});

export const transformAccountServiceDataForForm = (service: any) => {
  const subscriptionsPricing: any = {};

  const subscriptions = service.subscriptions?.map((subscription: any) => {
    subscriptionsPricing[subscription.uniqueId] = {
      currency: subscription.currency,
      subscriptionPrice: subscription.valuePerMonth,
    };

    return subscription.uniqueId;
  });

  return {
    serviceId: service.uniqueId,
    subscriptions,
    subscriptionsPricing,
  };
};

export const transformAccountServiceDataForAPI = (
  data: IAccountAssignService
) => {
  const subscriptions = data.subscriptions.map((id) => ({
    subscriptionUniqueId: id,
    ...data.subscriptionsPricing[id],
  }));

  return {
    serviceId: data.serviceId,
    subscriptions,
  };
};

//
// Account Device-Types Helpers
//
export const accountAssignDeviceTypeInitialValues: IAccountAssignDeviceType = {
  deviceTypeId: "",
  deviceProfileId: "",
  currency: 0,
  price: 0,
};

export const accountAssignDeviceTypeValidationSchema: Yup.Schema<IAccountAssignDeviceType> =
  Yup.object({
    deviceTypeId: Yup.string().trim().required().label("Device type"),
    deviceProfileId: Yup.string().trim().required().label("Device profile"),
    currency: Yup.number().label("Currency").required(),
    price: Yup.number().label("Price").required(),
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
