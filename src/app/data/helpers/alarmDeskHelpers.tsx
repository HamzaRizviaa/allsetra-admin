import * as Yup from "yup";
import {
  IAlarmReportTheft,
  IClearAlarm,
  IAlarmSendEmail,
  IAlarmSendSMS,
} from "app/data/types";
import { types, Badge } from "@vilocnv/allsetra-core";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

//
// ALARM DESK FORMS HELPERS
//
export const alarmReportTheftInitialValues: IAlarmReportTheft = {
  comment: "",
  handleAlarm: false,
};

export const alarmReportTheftValidationSchema: Yup.Schema<IAlarmReportTheft> =
  Yup.object({
    comment: Yup.string().trim().required().label("Comment"),
    handleAlarm: Yup.bool().required().label("Handle Alarm"),
  });

export const clearAlarmInitialValues: IClearAlarm = {
  reason: "",
  comment: "",
  isImportant: false,
  isFromAccount: false,
  delay: 0,
};

export const clearAlarmValidationSchema: Yup.Schema<IClearAlarm> = Yup.object({
  reason: Yup.string().trim().required().label("Reason"),
  comment: Yup.string().trim().required().label("Comment"),
  isImportant: Yup.bool().required().label("isImportant"),
  isFromAccount: Yup.bool().required().label("isFromAccount"),
  delay: Yup.number().required().label("Delay"),
});

export const alarmSendEmailInitialValues: IAlarmSendEmail = {
  defaultEmails: [],
  additionalEmails: [],
  message: "",
};

export const alarmSendEmailValidationSchema: Yup.Schema = Yup.object({
  defaultEmails: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Default email addresses"),
  additionalEmails: Yup.array()
    .of(Yup.string())
    .required()
    .label("Additional email addresses"),
  message: Yup.string().trim().required().label("Message"),
});

export const alarmSendSMSInitialValues: IAlarmSendSMS = {
  contactPersons: [],
  message: "",
};

export const alarmSendSMSValidationSchema: Yup.Schema = Yup.object({
  contactPersons: Yup.array()
    .of(Yup.string())
    .min(1)
    .required()
    .label("Default email addresses"),
  message: Yup.string().trim().required().label("Message"),
});

//
// ALARM DESK METADATA KEYVALUE TABLE HELPERS
//

export const transformAlarmForObjectInfoTable = (alarm: types.IAlarm) => {
  if (!alarm) return {};

  return {
    "A number": alarm.object?.aNumber ?? "",
    "Object Name": alarm.object?.name ?? "",
    Immobiliser: (
      <Badge colorScheme={alarm.hasImmobilizer ? "success" : "error"}>
        {alarm.hasImmobilizer ? "Yes" : "No"}
      </Badge>
    ),
  };
};

export const transformAlarmPersonsForTable = (alarmPersons: Array<any>) => {
  if (isEmpty(alarmPersons)) return {};

  const data: any = {};

  alarmPersons.forEach((person, index) => {
    data[`${index + 1} - ${person.firstName} ${person.lastName}`] = (
      <Link to={`tel:${person.phone}`}>
        <LocalPhoneIcon sx={{ width: "18px", height: "18px" }} />
      </Link>
    );
  });

  return data;
};

export const transformOwnerForCompanyInformation = (object: types.IObject) => {
  if (isEmpty(object)) return {};

  const { visitingAddress } = object.owner;

  const data: any = {
    "Company name": object.owner?.name || "",
    Address: `House #: ${visitingAddress.houseNumber}, Street: ${visitingAddress.street}, City: ${visitingAddress.city}, State: ${visitingAddress.state}`,
    Status: (
      <Badge
        colorScheme={object.owner.status === "ACTIVE" ? "success" : "error"}
      >
        {object.owner.status}
      </Badge>
    ),
  };

  return data;
};

export const transformOwnerCountriesForWhitelisted = (
  object: types.IObject
) => {
  if (isEmpty(object)) return {};

  const data: any = {};

  object.owner.countries.map((countryWhitelist: any) => {
    data[countryWhitelist.name] = "";
  });

  return data;
};

////                                                                         ////
//// ************************* PDF REPORT THEFT HELPERS ******************** ////
////                                                                         ////

export const transformAlarmForPDFGenralDataTable = (alarm: any) => {
  if (!alarm) return {};

  const { owner } = alarm.object;
  const { visitingAddress } = owner;

  return {
    "ID-nummer": alarm.aNumber ?? "",
    Bedrijfsnaam: owner?.name ?? "",
    "KvK-nummer": owner?.kvkcocNumber ?? "",
    Bezoekadres: visitingAddress
      ? `${visitingAddress.houseNumber}, ${visitingAddress.street}, ${visitingAddress.city}, ${visitingAddress.state}, ${visitingAddress.country?.name}`
      : "",
    Postcode: visitingAddress.postalCode ?? "",
    Vestigingsplaats: visitingAddress.city ?? "",
    Land: visitingAddress.country?.name ?? "",
    Telefoonnummer: visitingAddress?.phoneNumber ?? "",
  };
};

export const transformAlarmForPDFWarningAddressesTable = (
  alarmPersons: Array<any>
) => {
  if (isEmpty(alarmPersons)) return [];

  const data: any = {};

  alarmPersons.forEach((person, ind) => {
    data[`Warning Address ${ind + 1}`] = {
      Voornaam: person.firstName ?? "",
      Achternaam: person.lastName ?? "",
      "Mobiele nummer": person.phone ?? "",
      Emailadres: person.email ?? "",
    };
  });

  return data;
};

export const transformAlarmForPDFEquipmentTable = (alarm: any) => {
  if (!alarm) return {};

  const { object } = alarm;

  const equipmentData: any = {};

  !isEmpty(object.metadata)
    ? object.metadata.map((meta: any) => {
        const { field } = meta;

        equipmentData[field.label] = meta.value;
      })
    : (equipmentData["Data"] = "No Metadata Available");

  return equipmentData;
};

export const getFullAddress = async (lat: number, long: number) => {
  return new Promise<{ street: string; city: string; country: string }>(
    (resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(lat, long);

      let city = "City Not Available";
      let country = "Country Not Available";
      let street = "Street Not Available";

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          if (results && results[0]) {
            results[0].address_components.forEach((address) => {
              if (address.types.includes("locality")) {
                city = address.long_name;
              }
              if (address.types.includes("country")) {
                country = address.long_name;
              }
              if (address.types.includes("route")) {
                street = address.long_name;
              }
            });
          } else {
            console.log("Address not found");
          }
          resolve({ street, city, country });
        } else if (status === "ZERO_RESULTS") {
          console.log("No results found for provided coordinates");
          resolve({ street, city, country });
        } else {
          console.log("Geocoder failed due to: " + status);
          resolve({ street, city, country });
        }
      });
    }
  );
};

export const transformAlarmForPDFLocationNotificationTable = async (
  alarm: any
) => {
  if (!alarm) return {};

  const { street, city, country } = await getFullAddress(
    alarm.location?.latitude ?? 0,
    alarm.location?.longitude ?? 0
  );
  return {
    [street]: "",
    [city]: "",
    [country]: "",
    Coördinaten: alarm.location
      ? `${alarm.location?.latitude},${alarm.location?.longitude}`
      : "0,0",
    Tijdstip: alarm.location.date ?? "Not Available",
  };
};

export const transformAlarmForPDFLastGoodGpsTable = async (alarm: any) => {
  if (!alarm) return {};

  const { street, city, country } = await getFullAddress(
    alarm.object?.location?.latitude ?? 0,
    alarm.object?.location?.longitude ?? 0
  );

  return {
    [street]: "",
    [city]: "",
    [country]: "",
    Coördinaten: alarm.object?.location
      ? `${alarm.object?.location?.latitude},${alarm.object?.location?.longitude}`
      : "0,0",
    Tijdstip: alarm.object?.location?.date ?? "Not Available",
  };
};

export const transformAlarmForPDFMapImages = (alarm: any) => {
  if (!alarm) return {};

  const locationNotificationCoordinates = alarm.location
    ? `${alarm.location?.latitude},${alarm.location?.longitude}`
    : "0,0";
  const lastGoodGpsCoordinates = alarm.object?.location
    ? `${alarm.object?.location?.latitude},${alarm.object?.location?.longitude}`
    : "0,0";

  return {
    locationNotification: {
      imageUrl: "",
      location: locationNotificationCoordinates,
      zoom: "12",
      type: "roadmap",
    },

    lastGoodGpsZoomedOut: {
      imageUrl: "",
      location: lastGoodGpsCoordinates,
      zoom: "10",
      type: "roadmap",
    },

    lastGoodGpsMap: {
      imageUrl: "",
      location: lastGoodGpsCoordinates,
      zoom: "12",
      type: "roadmap",
    },

    lastGoodGpsZoomed: {
      imageUrl: "",
      location: lastGoodGpsCoordinates,
      zoom: "14",
      type: "roadmap",
    },

    lastGoodGpsSatZoomedOut: {
      imageUrl: "",
      location: lastGoodGpsCoordinates,
      zoom: "10",
      type: "hybrid",
    },

    lastGoodGpsSat: {
      imageUrl: "",
      location: lastGoodGpsCoordinates,
      zoom: "13",
      type: "hybrid",
    },
  };
};
