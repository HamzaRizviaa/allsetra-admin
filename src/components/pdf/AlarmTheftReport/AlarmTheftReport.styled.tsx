import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
  //pdf viewer
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },

  //header
  header: {
    margin: "10px 30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "90px",
  },
  headerTitle: {
    fontSize: "14px",
    fontWeight: 800,
    fontFamily: "Helvetica-Bold",
  },
  headerTitleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  logo: {
    height: "40px",
    width: "120px",
  },

  //footer
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: "Times-Italic",
  },

  //common

  pageTitle: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "Helvetica-Bold",
    margin: "10px 0px",
  },

  //google map images

  mapImageContainer: {
    margin: "10px 0px 30px 40px",
  },

  mapImage: {
    height: "450px",
    width: "450px",
  },
});
