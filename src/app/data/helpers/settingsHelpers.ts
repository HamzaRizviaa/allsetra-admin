import * as Yup from "yup";
import { ISettings } from "../types";

export const userSettingsInitialValues: ISettings = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  language: 0,
  uniqueId: "",
};

export const userSettingsValidationSchema = Yup.object({
  uniqueId: Yup.string().required().label("User number"),
  email: Yup.string().trim().required().label("Email"),
  firstName: Yup.string().trim().required().label("First name"),
  lastName: Yup.string().trim().required().label("Last name"),
  phone: Yup.string().required().label("Phone number"),
  language: Yup.number().required().label("Language"),
});
