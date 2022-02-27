import { useCallback, useEffect, useState } from "react";
import * as OSM from "osm-api";
import "./index.css";

export const LoginButton: React.VFC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(OSM.isLoggedIn());
  }, []);

  const login = useCallback(() => {
    (async () => {
      await OSM.login({
        mode: "popup",
        clientId: "q9sRK4UuNqv3_HLE8E7m2-wUAKS3XJSFWb9apehpAqE",
        scopes: ["read_prefs", "write_api", "write_notes"],
        redirectUrl: window.location.href.replace(window.location.hash, ""),
      });
      setLoggedIn(OSM.isLoggedIn());
      window.location.reload();
    })();
  }, []);

  const logout = useCallback(() => {
    (async () => {
      OSM.logout();
      setLoggedIn(false);
    })();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={login}>login</button>
      )}
    </div>
  );
};
