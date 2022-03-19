import { useCallback, useEffect, useState } from "react";

export const TweetButton: React.VFC = () => {
  const onClick = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  }, []);

  return (
    <a className="twitter-share-button" data-size="large" onClick={onClick}>
      Tweet
    </a>
  );
};
