import * as OSM from "osm-api";
import { OsmUser } from "osm-api";
import { useEffect, useState } from "react";

export const useOsmUser = (uid:number) => {
  const [user, setUser] = useState<OsmUser>();

  useEffect(() => {
    (async () => {
      const user = await OSM.getUser(uid);
      setUser(user);
    })();
  });

  return user;
};
