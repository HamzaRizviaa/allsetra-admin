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
    paymentType: data.paymentType,
    durationInMonths: data.durationInMonths,
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
  paymentType: 0,
  durationInMonths: 0,
  currency: 0,
  valuePerMonth: 0,
  deviceTypes: [],
  serviceId: "",
};

export const addSubscriptionValidationSchema: Yup.Schema = Yup.object({
  name: Yup.string().trim().required().label("Subscription name"),
  details: Yup.string().trim().required().label("Details"),
  subscriptionType: Yup.string().trim().required().label("Subscription type"),
  paymentType: Yup.number().required().label("Payment Type"),
  durationInMonths: Yup.number().required().label("Duration (months)"),
  currency: Yup.string().trim().required().label("Plan price"),
  valuePerMonth: Yup.number().required().label("Duration (months)"),
  deviceTypes: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Device type"),
  serviceId: Yup.string().trim().required().label("Service type"),
});
