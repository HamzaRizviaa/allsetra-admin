import { FC } from "react";
import {
  ContentSectionLayout,
  FormikToggleField,
} from "@vilocnv/allsetra-core";
import { Stack, Box, Typography } from "@mui/material";

const NotificationsSetting: FC = () => {
  return (
    <ContentSectionLayout
      title="Notifications"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <Box>
        <Stack spacing={2}>
          <Typography>Geofence crossing</Typography>
          <FormikToggleField
            label="Geofence In"
            name="notifications.GeofenceIn"
          />
          <FormikToggleField
            label="Geofence Out"
            name="notifications.GeofenceOut"
          />
          <FormikToggleField
            label="Geofence In (outside object working hours)"
            name="notifications.GeofenceInOutsideWorkingHours"
          />
          <FormikToggleField
            label="Geofence Out (outside object working hours)"
            name="notifications.GeofenceOutOutsideWorkingHours"
          />
        </Stack>
        <Stack mt={4} spacing={2}>
          <Typography>Object details</Typography>
          <FormikToggleField
            label="Object ignition off"
            name="notifications.IgnitionOff"
          />
          <FormikToggleField
            label="Object ignition on"
            name="notifications.IgnitionOn"
          />
          <FormikToggleField
            label="Object fuel low"
            name="notifications.LowFuel"
          />
        </Stack>
        <Stack mt={4} spacing={2}>
          <Typography>Other</Typography>
          <FormikToggleField
            label="New trip started"
            name="notifications.NewTripStarted"
          />
          <FormikToggleField
            label="Private/Business end trip reminder"
            name="notifications.PrivateOrBusinessEndTripReminder"
          />
        </Stack>
      </Box>
    </ContentSectionLayout>
  );
};

export default NotificationsSetting;
