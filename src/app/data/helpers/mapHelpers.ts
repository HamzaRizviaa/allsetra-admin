import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
    libraries: ["drawing"],
  });

  return { isLoaded, loadError };
};
