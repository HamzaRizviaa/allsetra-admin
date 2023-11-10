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
  LocationTimelineContainer,
  LocationTimelineWrapper,
  TimelineContentDetail,
  TimelineContentDetailsWrapper,
  TimelineContentWrapper,
} from "./LocationTimeline.styled";
import { CalendarIcon, TrackingIcon } from "assets/icons";

export interface TimeLineItemProps {
  color: string;
  title: string;
  location?: string;
  dateAndTime?: string;
  timelineDotDetails?: any;
  address?: string;
  height: string;
}
export interface LocationTimelineProps {
  timeLineItems: Array<TimeLineItemProps>;
}

const LocationTimeline: FC<LocationTimelineProps> = ({ timeLineItems }) => {
  return (
    <LocationTimelineContainer>
      {timeLineItems && (
        <Timeline>
          {timeLineItems.map((item, index, array) => (
            <LocationTimelineWrapper
              color={item.color}
              color2={array[index + 1]?.color}
              height={item.height}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot>{item.timelineDotDetails}</TimelineDot>
                  {!(index + 1 === array.length) && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <TimelineContentWrapper>
                    <h3>{item.title}</h3>
                    <TimelineContentDetailsWrapper>
                      {item.dateAndTime && (
                        <TimelineContentDetail>
                          <CalendarIcon />
                          <p>{item.dateAndTime}</p>
                        </TimelineContentDetail>
                      )}

                      {item.location && (
                        <TimelineContentDetail>
                          <TrackingIcon />
                          <p>{item.location}</p>
                        </TimelineContentDetail>
                      )}

                      {item.address && (
                        <TimelineContentDetail>
                          <p>{item.address}</p>
                        </TimelineContentDetail>
                      )}
                    </TimelineContentDetailsWrapper>
                  </TimelineContentWrapper>
                </TimelineContent>
              </TimelineItem>
            </LocationTimelineWrapper>
          ))}
        </Timeline>
      )}
    </LocationTimelineContainer>
  );
};

export default LocationTimeline;
