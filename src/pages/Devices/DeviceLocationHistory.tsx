import { FC, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import { PageLoader, Topbar } from "@vilocnv/allsetra-core";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectDevicesState } from "app/data/selectors";
import { getDeviceLocationHistoryThunk } from "app/features";

const DeviceLocationHistory: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const { deviceLocationHistory } = useAppSelector(selectDevicesState);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
  });

  useEffect(() => {
    if (isEmpty(params.id)) {
      navigate(-1);
    } else {
      dispatch(
        getDeviceLocationHistoryThunk({
          deviceId: params.id ?? "",
          locationSearch: location.search,
        })
      );
    }
  }, [params]);

  return (
    <Box>
      <Topbar
        title="Location History"
        breadcrumbTitle="Device Details"
        theme={theme}
      />
      <Box mx={4} sx={{ width: "95%", height: "85vh" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={{ lat: 52.0, lng: 5.301137 }}
            zoom={8}
          >
            {deviceLocationHistory.map((item) => (
              <MarkerF position={{ lat: item.latitude, lng: item.longitude }} />
            ))}
          </GoogleMap>
        ) : (
          <PageLoader />
        )}
      </Box>
    </Box>
  );
};

export default DeviceLocationHistory;
