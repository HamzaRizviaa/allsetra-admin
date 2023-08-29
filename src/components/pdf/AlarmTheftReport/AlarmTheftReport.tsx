import { FC } from "react";
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
import { styles } from "./AlarmTheftReport.styled";

//Children
import Header from "./children/Header";
import Footer from "./children/Footer";
import InnerForm from "./children/InnerForm";

//Data
import { useAppSelector } from "hooks";
import { selectAlarmDeskState } from "app/data/selectors";
import { useGetAlarmPersonsForAlarmQuery } from "app/features";

interface Props {}

const AlarmTheftReport: FC<Props> = ({}) => {
  // Global State
  const { specificAlarm } = useAppSelector(selectAlarmDeskState);

  const { data: alarmPersonsDataInfo } = useGetAlarmPersonsForAlarmQuery(
    specificAlarm && specificAlarm?.uniqueId
  );

  return (
    <PDFViewer style={styles.viewer}>
      <Document title="Beknopt Protocol">
        <Page size="A4" wrap>
          <Header />
          <InnerForm
            specificAlarm={specificAlarm}
            alarmPersonsData={alarmPersonsDataInfo}
          />
          <Footer />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default AlarmTheftReport;
