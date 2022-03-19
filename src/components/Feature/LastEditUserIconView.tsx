import { Feature } from "geojson";
import { toSvg } from "jdenticon";

export const LastEditUserIconView: React.VFC<{
  feature: Feature;
  size: number;
}> = ({ feature, size }) => {
  if (feature.properties === null) {
    return null;
  }
  return (
    <>
      {feature.properties.userIconHref.length > 0 ? (
        <img
          src={feature.properties.userIconHref}
          style={{
            width: size + "px",
            height: size + "px",
          }}
        />
      ) : (
        <span
          dangerouslySetInnerHTML={{
            __html: toSvg(feature.properties.user || "noname", size),
          }}
        />
      )}
    </>
  );
};
