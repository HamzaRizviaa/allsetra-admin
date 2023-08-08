import { isEmpty, omit } from "lodash";

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
