import { isEmpty, omit } from "lodash";
import * as Yup from "yup";
import { IAddDMappingType } from "../types";

export const transformAddressObjectForForm = (address: any) => {
  if (isEmpty(address)) return null;

  const removedUnwantedKeys = omit(address, [
    "country",
    "created",
    "createdBy",
    "deleted",
    "deletedBy",
    "isDeleted",
    "lastUpdated",
    "updatedBy",
  ]);

  return {
    ...removedUnwantedKeys,
    countryId: !isEmpty(address.country) ? address.country.id : null,
  };
};

export const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  const date = new Date(dateString);
  //@ts-ignore
  return date.toLocaleString("en-US", options);
};

//
// ADD MAPPING FORM HELPERS
//

export const addMappingInitialValues: IAddDMappingType = {
  dataPointId: -1,
  identifierId: -1,
  triggerMode: -1,
  isInverted: false,
  dynamicFields: "",
};

export const addMappingValidationSchema = Yup.object({
  dataPointId: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .required()
    .label("Data Point"),
  identifierId: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .required()
    .label("Identifier"),
  triggerMode: Yup.number()
    .integer("Please select the required field")
    .min(0, "Please select the required field")
    .required()
    .label("Trigger Mode"),
  isInverted: Yup.boolean().required().label("Inverted"),
  dynamicFields: Yup.string()
    .trim()
    .required()
    .label("Operating Time Voltage Threshold"),
});
