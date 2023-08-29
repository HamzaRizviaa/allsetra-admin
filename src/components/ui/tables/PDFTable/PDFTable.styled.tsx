import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const pdfTableStyles = StyleSheet.create({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    margin: "0px 30px 40px 40px",
  },
  pdfTableTitle: {
    fontSize: "10px",
    fontWeight: 600,
    fontFamily: "Helvetica-Bold",
  },
  keyValueContainer: {
    display: "flex",
    flexDirection: "row",
  },
  pdfTableText: {
    fontSize: "10px",
    fontFamily: "Helvetica",
  },
  pdfTableKey: {
    width: "200px",
    fontSize: "10px",
    fontFamily: "Helvetica",
  },
});
