import { Feature } from "geojson";

export const LastEditUserTextView: React.FC<{
  feature: Feature;
}> = ({ feature }) => {
  if (!feature.properties?.uid) {
    return null;
  }
  return <span>Last edited by: {feature.properties.user}</span>;
};
