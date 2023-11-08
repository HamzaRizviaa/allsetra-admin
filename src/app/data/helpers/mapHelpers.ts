import { useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_LIBRARIES = ["drawing"] as any[];

export const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return { isLoaded, loadError };
};
