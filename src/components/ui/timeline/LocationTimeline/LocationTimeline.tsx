import { FC, Fragment } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  LocationTimelineWrapper,
  TimelineContentDetail,
  TimelineContentDetailsWrapper,
  TimelineContentWrapper,
} from "./LocationTimeline.styled";
import { CalendarIcon, TrackingIcon } from "assets/icons";

export interface TimeLineItemProps {
  color: string;
  title: string;
  location: string;
  dateAndTime: string;
  deviceNumber: string;
}
export interface LocationTimelineProps {
  timeLineItems: Array<TimeLineItemProps>;
}

const LocationTimeline: FC<LocationTimelineProps> = ({ timeLineItems }) => {
  return (
    <Fragment>
      {timeLineItems && (
        <Timeline>
          {timeLineItems.map((item, index, array) => (
            <LocationTimelineWrapper
              color={item.color}
              color2={array[index + 1]?.color}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot>{item.deviceNumber}</TimelineDot>
                  {!(index + 1 === array.length) && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <TimelineContentWrapper>
                    <h3>{item.title}</h3>
                    <TimelineContentDetailsWrapper>
                      <TimelineContentDetail>
                        <CalendarIcon />
                        <p>{item.dateAndTime}</p>
                      </TimelineContentDetail>

                      <TimelineContentDetail>
                        <TrackingIcon />
                        <p>{item.location}</p>
                      </TimelineContentDetail>
                    </TimelineContentDetailsWrapper>
                  </TimelineContentWrapper>
                </TimelineContent>
              </TimelineItem>
            </LocationTimelineWrapper>
          ))}
        </Timeline>
      )}
    </Fragment>
  );
};

export default LocationTimeline;
