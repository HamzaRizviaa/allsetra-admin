import * as Yup from "yup";
import {
  IAddSubscription,
  ISubscription,
} from "../types/subscriptionManagerTypes";

export const subscriptionDataFormatterForForm = (data: ISubscription) => {
  const payload = {
    name: data.name,
    details: data.details,
    subscriptionType: data.subscriptionType,
    contractTerm: data.contractTerm,
    prolongationInMonths: data.prolongationInMonths,
    terminationInMonths: data.terminationInMonths,
    currency: data.currency,
    valuePerMonth: data.valuePerMonth,
    uniqueId: data.uniqueId,
    deviceTypes: data.deviceTypes.map((item) => item.uniqueId),
    serviceId: data.service.uniqueId,
  };
  return payload;
};

export const addSubscriptionInitialValues: IAddSubscription = {
  name: "",
  details: "",
  subscriptionType: "",
  contractTerm: 0,
  prolongationInMonths: 0,
  terminationInMonths: 0,
  currency: 0,
  valuePerMonth: 0,
  deviceTypes: [],
  serviceId: "",
};

export const addSubscriptionValidationSchema: Yup.Schema = Yup.object({
  name: Yup.string().trim().required().label("Subscription name"),
  details: Yup.string().trim().required().label("Details"),
  subscriptionType: Yup.string().trim().required().label("Subscription type"),
  contractTerm: Yup.number().required().label("Contract term"),
  prolongationInMonths: Yup.number().required().label("Prolongation term"),
  terminationInMonths: Yup.number().required().label("Termination term"),
  currency: Yup.string().trim().required().label("Plan price"),
  valuePerMonth: Yup.number().required().label("Duration (months)"),
  deviceTypes: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Device type"),
  serviceId: Yup.string().trim().required().label("Service type"),
});
