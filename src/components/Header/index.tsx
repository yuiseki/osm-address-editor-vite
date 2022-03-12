import { useCallback, useEffect, useState } from "react";
import * as OSM from "osm-api";
import { OsmUser } from "osm-api";
import { LoginButton } from "./LoginButton";
import { UserIcon } from "./UserIcon";

export const Header: React.VFC = () => {
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
  return (
    <div
      style={{
        zIndex: 100,
        position: "relative",
        top: 0,
        left: 0,
        height: "44px",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgba(0, 255, 255, 0.9)",
      }}
    >
      <div>
        <h1
          className="text-4xl font-bold"
          style={{ display: "inline", margin: "0px" }}
        >
          OSM address editor
        </h1>
        {currentUser ? (
          <span style={{ marginLeft: "10px" }}>
            Hi {currentUser?.display_name}, You have{" "}
            {currentUser?.changesets.count} changesets.
          </span>
        ) : (
          <span style={{ marginLeft: "10px" }}>
            Please logged in as OSM user.
          </span>
        )}
      </div>
      <div style={{ display: "flex", flex: 1, justifyContent: "end" }}>
        <div>
          <UserIcon />
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};
