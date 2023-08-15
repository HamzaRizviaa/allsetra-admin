import { styled, Box } from "@mui/material";

export const LocationTimelineWrapper = styled(Box)<{
  color: string;
  color2?: string;
}>(({ color, color2 }) => ({
  "& .MuiTimelineDot-root": {
    backgroundColor: color,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "120%",
    display: "flex",
    width: "32px",
    height: "32px",
    padding: "4px",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    margin: "0px",
  },

  "& .MuiTimelineConnector-root": {
    height: "200px",
    background: `linear-gradient(180deg, ${color}, ${color2})`,
  },

  "& .MuiTimelineItem-root:before": {
    content: "none",
  },
}));

export const TimelineContentWrapper = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "14px",
  marginLeft: "24px",

  "& h3": {
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "112%",
    color: "#1D1F2B",
    marginTop: "0px",
  },
});

export const TimelineContentDetailsWrapper = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "9px",

  "& h3": {
    fontFamily: "Gilroy",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "112%",
    color: "#1D1F2B",
  },
});

export const TimelineContentDetail = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",

  "& p": {
    color: "#323946",
    fontFamily: "Gilroy",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "115%",
  },

  "& svg": {
    color: "#959EB2",
  },
});
