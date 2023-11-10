import { FC, useState, useEffect, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import {
  FilterButton,
  PageLoader,
  SelectInputField,
} from "@vilocnv/allsetra-core";
import { MapContainer, SearchFieldWrapper, TopLeftSection } from "./Map.styled";
import Geozone from "../Map/children/Geozone";
import { useGoogleMapsLoader } from "app/data/helpers/mapHelpers";
import { useTheme } from "@mui/material";
import { FilterIcon } from "assets/icons";
import MarkerClusterer from "./children/MarkerClusterer";
import { isEmpty } from "lodash";

interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  radius?: number; // Specify the radius around the center for random placement
  objects: Array<any>;
  geozones?: Array<any>;
  height?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  disableNavigator?: boolean;
  onFilterClick?: () => void;
  objectsMarker?: boolean;
}

const Map: FC<MapProps> = ({
  center,
  zoom = 12,
  radius = 50,
  objects,
  geozones,
  height,
  showSearch = false,
  showFilter = false,
  disableNavigator = false,
  onFilterClick,
  objectsMarker = false,
}) => {
  const theme = useTheme();

  // Local State
  const [mapRef, setMapRef] = useState<any>();
  const [centerCoords, setCenterCoords] = useState(
    center || { lat: 52.0, lng: 5.301137 }
  );
  const [shouldRenderMarkers, setShouldRenderMarkers] = useState(false);
  const [shouldRenderGeozone, setShouldRenderGeozone] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>("");
  const [selectedObject, setSelectedObject] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [customMarkers, setCustomMarkers] = useState([]);

  const { isLoaded, loadError } = useGoogleMapsLoader();

  const panToCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setCenterCoords(coords);
      mapRef?.panTo(coords);
    });
  }, []);

  useEffect(() => {
    extractData(objects);
  }, [objects]);

  const extractData = (objects: any) => {
    const formattedObjects = objects
      .filter((item: any) => item.location)
      .map((item: any) => {
        const { latitude, longitude } = item.location;
        const iconUrl = item?.objectType?.icon?.url;

        const originalDate = new Date(item.location.date);
        const formattedDate = originalDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return {
          lat: latitude,
          lng: longitude,
          iconUrl,
          name: item.name,
          aNumber: item.aNumber,
          accuracy: item.location.accuracy,
          formattedDate,
          lastReportedSpeed: item.lastReportedSpeed,
          uniqueId: item.uniqueId,
        };
      });
    setCustomMarkers(formattedObjects);
  };

  useEffect(() => {
    if (!disableNavigator) {
      panToCurrentPosition();
    }
  }, []);

  useEffect(() => {
    if (objects.length > 0) {
      setShouldRenderMarkers(true);
    }
    if (geozones && geozones.length > 0) {
      setShouldRenderGeozone(true);
    }
  }, [objects, geozones]);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  const onMapLoad = (map: any) => {
    setMapRef(map);
    if (!disableNavigator) {
      panToCurrentPosition();
    }
  };

  const handleZoomChange = () => {
    if (mapRef) {
      setCurrentZoom(mapRef.getZoom());
    }
  };

  const onObjectChange = (value: any) => {
    if (isEmpty(value)) return;

    const objectIndex = objects.findIndex((obj: any) => obj.uniqueId === value);

    if (objectIndex < 0) return;

    setSelectedObject(objects[objectIndex]);
    handleMarkerClick(objects[objectIndex].uniqueId);

    mapRef.setZoom(22);
    mapRef?.panTo({
      lat: objects[objectIndex].location.latitude,
      lng: objects[objectIndex].location.longitude,
    });
  };

  const renderMap = () => {
    return (
      <MapContainer height={height || "100vh"}>
        <TopLeftSection>
          {showSearch && (
            <SearchFieldWrapper>
              <SelectInputField
                name="object"
                placeholder="Search on objects..."
                options={objects ?? []}
                optionLabelKey={"name"}
                optionValueKey={"uniqueId"}
                onChange={onObjectChange}
                searchable
              />
            </SearchFieldWrapper>
          )}
          {showFilter && (
            <FilterButton
              theme={theme}
              onClick={onFilterClick}
              icon={<FilterIcon />}
            />
          )}
        </TopLeftSection>
        <GoogleMap
          center={centerCoords}
          zoom={zoom}
          onLoad={onMapLoad}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          onZoomChanged={handleZoomChange}
        >
          {shouldRenderGeozone && geozones && (
            <Geozone
              geozone={geozones}
              radius={radius}
              objectsMarker={objectsMarker}
            />
          )}
          {shouldRenderMarkers && (
            <MarkerClusterer
              markers={customMarkers}
              handleMarkerClick={handleMarkerClick}
              map={mapRef}
              selectedMarker={selectedMarker}
            />
          )}
        </GoogleMap>
      </MapContainer>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <PageLoader />;
};

export default Map;
