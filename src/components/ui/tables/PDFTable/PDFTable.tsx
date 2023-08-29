import { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { pdfTableStyles as styles } from "./PDFTable.styled";

interface Props {
  title?: string;
  records: any;
  showValues?: boolean;
}

const PDFTable: FC<Props> = ({ title, records, showValues = true }) => {
  return (
    <View style={styles.tableContainer}>
      {title && <Text style={styles.pdfTableTitle}>{title}</Text>}
      {Object.keys(records).map((key, ind) => (
        <View style={styles.keyValueContainer}>
          <Text style={showValues ? styles.pdfTableKey : styles.pdfTableText}>
            {key}
          </Text>
          {showValues && (
            <Text style={styles.pdfTableText}>: {records[key]}</Text>
          )}
          {!showValues && ind > 2 && (
            <Text style={styles.pdfTableText}>: {records[key]}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

export default PDFTable;
