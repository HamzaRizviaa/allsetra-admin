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

//
// ADD MAPPING FORM HELPERS
//

export const addMappingInitialValues: IAddDMappingType = {
  dataPoint: "",
  identifier: "",
  triggerMode: "",
  inverted: false,
  voltageThreshold: "",
};

export const addMappingValidationSchema = Yup.object({
  dataPoint: Yup.string().required().label("Data Point"),
  identifier: Yup.string().trim().required().label("Identifier"),
  triggerMode: Yup.string().trim().required().label("Trigger Mode"),
  inverted: Yup.boolean().required().label("Inverted"),
  voltageThreshold: Yup.string()
    .trim()
    .required()
    .label("Operating Time Voltage Threshold"),
});
