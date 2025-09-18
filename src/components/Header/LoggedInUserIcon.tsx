import { useCallback, useEffect, useState } from "react";
import * as OSM from "osm-api";
import { OsmUser } from "osm-api";

export const UserIcon: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<OsmUser | undefined>(
    undefined
  );

  useEffect(() => {
    setLoggedIn(OSM.isLoggedIn());
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    (async () => {
      const me = await OSM.getUser("me");
      setCurrentUser(me);
    })();
  }, [loggedIn]);

  const avatarSrc = currentUser?.img?.href;

  return (
    <>
      {currentUser ? (
        <img
          style={{ width: "44px", height: "44px" }}
          src={avatarSrc ?? undefined}
          alt={currentUser.display_name}
          title={currentUser.display_name}
        />
      ) : (
        <img />
      )}
    </>
  );
};
