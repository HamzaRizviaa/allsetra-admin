import { FC, useEffect, useMemo, useState } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "../AlarmTheftReport.styled";
import PDFTable from "components/ui/tables/PDFTable/PDFTable";

import {
  transformAlarmForPDFEquipmentTable,
  transformAlarmForPDFExtraTable,
  transformAlarmForPDFGenralDataTable,
  transformAlarmForPDFInsuranceTable,
  transformAlarmForPDFLastGoodGpsTable,
  transformAlarmForPDFLocationNotificationTable,
  transformAlarmForPDFMapImages,
  transformAlarmForPDFWarningAddressesTable,
} from "app/data/helpers";

export interface PDFDataProps {
  specificAlarm: any;
  alarmPersonsData: any;
}

const InnerForm: FC<PDFDataProps> = ({ specificAlarm, alarmPersonsData }) => {
  const {
    generalDataInfo,
    insuranceDataInfo,
    warningAddressesDataInfo,
    equipmentDataInfo,
    extraDataInfo,
    locationNotificationDataInfo,
    lastGoodGpsDataInfo,
    mapImagesData,
  } = useMemo(() => {
    return {
      generalDataInfo: transformAlarmForPDFGenralDataTable(specificAlarm),
      insuranceDataInfo: transformAlarmForPDFInsuranceTable(specificAlarm),
      warningAddressesDataInfo:
        transformAlarmForPDFWarningAddressesTable(alarmPersonsData),
      equipmentDataInfo: transformAlarmForPDFEquipmentTable(specificAlarm),
      extraDataInfo: transformAlarmForPDFExtraTable(specificAlarm),
      locationNotificationDataInfo:
        transformAlarmForPDFLocationNotificationTable(specificAlarm),
      lastGoodGpsDataInfo: transformAlarmForPDFLastGoodGpsTable(specificAlarm),
      mapImagesData: transformAlarmForPDFMapImages(specificAlarm),
    };
  }, [specificAlarm, alarmPersonsData]);

  //Local State
  const [mapImages, setMapImages] = useState<any>(mapImagesData);
  const [addresses, setAddresses] = useState<any>();

  useEffect(() => {
    const updatedMapImages = Object.fromEntries(
      Object.keys(mapImages).map((mapImage) => {
        const markerLocation = `${mapImages[mapImage].location}`;
        const markerColor = "red";
        const mapType = mapImages[mapImage].type;

        const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapImages[mapImage].location}&zoom=${mapImages[mapImage].zoom}&size=450x450&markers=color:${markerColor}|${markerLocation}&maptype=${mapType}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;

        return [mapImage, { ...mapImages[mapImage], imageUrl }];
      })
    );

    setMapImages(updatedMapImages);
  }, []);

  useEffect(() => {
    Promise.all([locationNotificationDataInfo, lastGoodGpsDataInfo]).then(
      ([locationNotificationResponse, lastGoodGpsResponse]) => {
        setAddresses({
          locationNotification: locationNotificationResponse,
          lastGoodGps: lastGoodGpsResponse,
        });
      }
    );
  }, []);

  console.log(addresses, "jjjjjs");

  return (
    <>
      <View>
        <Text style={styles.pageTitle}>Algemeen</Text>
        <PDFTable title="Algemene gegevens" records={generalDataInfo} />
        <PDFTable title="Verzekering" records={insuranceDataInfo} />
      </View>

      <View break>
        <Text style={styles.pageTitle}>Waarschuwingsadressen</Text>
        {Object.keys(warningAddressesDataInfo).map((key) => (
          <View wrap={false}>
            <PDFTable title={key} records={warningAddressesDataInfo[key]} />
          </View>
        ))}
      </View>

      <View break>
        <Text style={styles.pageTitle}>Materieel</Text>
        <PDFTable title="Materieelgegevens" records={equipmentDataInfo} />
      </View>

      <View break>
        <Text style={styles.pageTitle}>Extra</Text>
        <PDFTable title="Extra gegevens" records={extraDataInfo} />
      </View>

      <View break>
        <Text style={styles.pageTitle}>Locatie melding</Text>
        <View style={styles.mapImageContainer}>
          <Image
            src={mapImages.locationNotification.imageUrl}
            style={styles.mapImage}
          />
        </View>

        {addresses?.locationNotification && (
          <PDFTable
            title="Adresgegevens"
            records={addresses?.locationNotification}
            showValues={false}
          />
        )}
      </View>

      <View break>
        <Text style={styles.pageTitle}>
          Locatie laatste goede GPS (Kaart, Uitgezoomd)
        </Text>
        <View style={styles.mapImageContainer}>
          <Image
            src={mapImages.lastGoodGpsZoomedOut.imageUrl}
            style={styles.mapImage}
          />
        </View>
        {addresses?.lastGoodGps && (
          <PDFTable
            title="Adresgegevens"
            records={addresses?.lastGoodGps}
            showValues={false}
          />
        )}
      </View>

      <View break>
        <Text style={styles.pageTitle}>Locatie laatste goede GPS (Kaart)</Text>
        <View style={styles.mapImageContainer}>
          <Image
            src={mapImages.lastGoodGpsMap.imageUrl}
            style={styles.mapImage}
          />
        </View>
        {addresses?.lastGoodGps && (
          <PDFTable
            title="Adresgegevens"
            records={addresses?.lastGoodGps}
            showValues={false}
          />
        )}
      </View>

      <View break>
        <Text style={styles.pageTitle}>
          Locatie laatste goede GPS (Kaart, Ingezoomd)
        </Text>
        <View style={styles.mapImageContainer}>
          <Image
            src={mapImages.lastGoodGpsZoomed.imageUrl}
            style={styles.mapImage}
          />
        </View>
        {addresses?.lastGoodGps && (
          <PDFTable
            title="Adresgegevens"
            records={addresses?.lastGoodGps}
            showValues={false}
          />
        )}
      </View>

      <View break>
        <Text style={styles.pageTitle}>
          Locatie laatste goede GPS (Satelliet, Uitgezoomed)
        </Text>
        <View style={styles.mapImageContainer}>
          <Image
            src={mapImages.lastGoodGpsSatZoomedOut.imageUrl}
            style={styles.mapImage}
          />
        </View>
        {addresses?.lastGoodGps && (
          <PDFTable
            title="Adresgegevens"
            records={addresses?.lastGoodGps}
            showValues={false}
          />
        )}
      </View>

      <View break>
        <Text style={styles.pageTitle}>
          Locatie laatste goede GPS (Satelliet)
        </Text>
        <View style={styles.mapImageContainer}>
          <Image
            src={mapImages.lastGoodGpsSat.imageUrl}
            style={styles.mapImage}
          />
        </View>
        {addresses?.lastGoodGps && (
          <PDFTable
            title="Adresgegevens"
            records={addresses?.lastGoodGps}
            showValues={false}
          />
        )}
      </View>
    </>
  );
};

export default InnerForm;