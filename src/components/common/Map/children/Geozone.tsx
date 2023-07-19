import { FC } from "react";
import { CircleF } from "@react-google-maps/api";

const GEOZONE_OPTIONS = {
  strokeColor: "#b1bae8",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#b1bae8cc",
  fillOpacity: 0.35,
};

interface GeozoneProps {
  geozone: Array<any>;
  radius: number;
}

const Geozone: FC<GeozoneProps> = ({ geozone, radius }) => {
  const center = geozone[0]; // Assuming the first point in the geozone array is the center

  // Calculate the radius based on the specified radius prop
  const circleRadius = Math.sqrt(radius) * 1000 * 2; // Adjust the multiplier as needed

  return (
    <CircleF center={center} radius={circleRadius} options={GEOZONE_OPTIONS} />
  );
};

export default Geozone;
