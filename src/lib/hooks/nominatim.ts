import { useCallback, useState } from "react";

export const useNominatim = () => {
  const [loadingNominatim, setLoadingNominatim] = useState(false);

  const fetchNominatimReverse = useCallback(async (latitude, longitude) => {
    setLoadingNominatim(true);
    console.log("nominatim: loading...");

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
    );
    const json = await res.json();
    console.log("nominatim json: ", json);

    console.log("nominatim: loaded.");
    setLoadingNominatim(false);
  }, []);

  const fetchNominatimByWay = useCallback(async (wayId) => {
    setLoadingNominatim(true);
    console.log("nominatim way: loading...");
    const res = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=W${wayId}&format=jsonv2`
    );
    const json = await res.json();
    console.log("nominatim way json: ", json);

    console.log("nominatim way: loaded.");
    setLoadingNominatim(false);
  }, []);

  return { fetchNominatimReverse, fetchNominatimByWay, loadingNominatim };
};
