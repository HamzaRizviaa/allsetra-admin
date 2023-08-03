import { isEmpty } from "lodash";

export const transformAddressObjectForForm = (address: any) => {
  if (isEmpty(address)) return null;

  return {
    ...address,
    country: !isEmpty(address.country) ? address.country.id : null,
  };
};
