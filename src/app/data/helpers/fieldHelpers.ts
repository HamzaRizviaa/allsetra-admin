import * as Yup from "yup";
import { IAddField } from "../types";

export const addFieldInitialValues: IAddField = {
  label: "",
  isRequired: false,
  onlyNumbers: false,
  fieldType: "",
  maxLength: "",
};

export const addFieldValidationSchema = Yup.object({
  label: Yup.string().trim().required().label("Field label"),
  fieldType: Yup.string().trim().required().label("Field type"),
  maxLength: Yup.string().required().label("Max length"),
  isRequired: Yup.boolean().required().label("Field is required"),
  onlyNumbers: Yup.boolean().required().label("Only numbers"),
});
