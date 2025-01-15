import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ViewState } from "react-map-gl/maplibre";

export const TweetButton: React.VFC<{ viewState?: ViewState }> = ({
  viewState,
}) => {
  const [url, setUrl] = useState(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`
  );

  useEffect(() => {
    setUrl(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}`
    );
  }, [viewState]);

  return (
    <>
      {viewState && url && (
        <a
          href={url}
          target="_blank"
          className="twitter-share-button"
          style={{
            backgroundColor: "#1d9bf0",
            color: "white",
            padding: "3.5px 8px",
            borderRadius: "15px",
          }}
        >
          <FontAwesomeIcon
            icon={faTwitter as IconDefinition}
            style={{ padding: "0px 3px" }}
          />
          <span style={{ padding: "0px 3px" }}>Tweet</span>
        </a>
      )}
    </>
  );
};
