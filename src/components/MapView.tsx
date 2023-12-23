import { Map } from "mapbox-gl";
import { useLayoutEffect, useRef } from "react";
import { Loading } from ".";
import { usePlacesStore } from "../stores";
import { useMapStore } from "../stores/map/map.store";
import "./../index.css";
export const MapView = () => {
  const userLocation = usePlacesStore((state) => state.userLocation);
  const isLoading = usePlacesStore((state) => state.isLoading);
  const setMap = useMapStore((state) => state.setMap);

  const mapDiv = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const m = new Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(m);
    }
  }, [isLoading, userLocation]);

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
    ></div>
  );
};
