import { useLayoutEffect, useRef } from "react";
import { Loading } from ".";
import { usePlacesStore } from "../stores";
import "./../index.css";
import { Map } from "mapbox-gl";
import { useMapStore } from "../stores/map/map.store";
export const MapView = () => {
  const userLocation = usePlacesStore((state) => state.userLocation);
  const isLoading = usePlacesStore((state) => state.isLoading);
  const setMap = useMapStore((state) => state.setMap);

  const mapDiv = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading, userLocation, setMap]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
      }}
    >
      {userLocation?.join(",")}
    </div>
  );
};
