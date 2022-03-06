import { useCallback, useEffect, useState } from "react";
import * as OSM from "osm-api";

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
        <button
          style={{ height: "44px" }}
          className="button py-1 px-1 border-transparent border-4 bg-gray-300 text-gray-900 hover:text-gray-500"
          onClick={logout}
        >
          logout
        </button>
      ) : (
        <button
          style={{ height: "44px" }}
          className="button py-1 px-1 border-transparent border-4 bg-gray-300 text-gray-900 hover:text-gray-500"
          onClick={login}
        >
          login
        </button>
      )}
    </div>
  );
};
