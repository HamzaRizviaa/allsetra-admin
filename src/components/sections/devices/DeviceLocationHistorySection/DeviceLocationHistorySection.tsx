import { FC, Fragment, useState } from "react";
import {
  DeviceDetailsSubtitle,
  HeadingTitleContainer,
} from "../DeviceDetailsHeader/DeviceDetailsHeader.styled";
import { Typography } from "@mui/material";
import LocationTimeline from "components/ui/timeline/LocationTimeline/LocationTimeline";
import {
  DateRangeContainer,
  TimelineContainer,
} from "./DeviceLocationHistorySection.styled";
import { DateRangePicker } from "@vilocnv/allsetra-core";

//Data
import { timelineItems } from "app/data/helpers/devicesHelpers";
import { useActiveDevice } from "hooks";

const DeviceLocationHistorySection: FC = () => {
  //Global state
  const { specificDevice } = useActiveDevice();

  //Local state
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (value: any) => {
    setValue(value);
  };

  return (
    <Fragment>
      <HeadingTitleContainer>
        <DeviceDetailsSubtitle>
          {specificDevice?.deviceType.name}
        </DeviceDetailsSubtitle>
        <Typography variant={"h2"}>{specificDevice?.name}</Typography>
      </HeadingTitleContainer>
      <DateRangeContainer>
        <DateRangePicker
          onChange={handleDateChange}
          value={value}
          name="datepicker"
        />
      </DateRangeContainer>
      <TimelineContainer>
        <LocationTimeline timeLineItems={timelineItems} />
      </TimelineContainer>
    </Fragment>
  );
};

export default DeviceLocationHistorySection;
