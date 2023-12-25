import { useEffect } from "react";
import { usePlacesStore } from "../stores";
import { useMapStore } from "../stores/map/map.store";
import { Marker, Popup } from "mapbox-gl";

interface Props {
  children: React.ReactNode;
}

export const PlacesProvider = ({ children }: Props) => {
  const setUserLocation = usePlacesStore((state) => state.setUserLocation);
  const setIsLoading = usePlacesStore((state) => state.setIsLoading);
  const removeMarkersFromMap = useMapStore(
    (state) => state.removeMarkersFromMap
  );

  const places = usePlacesStore((state) => state.places);
  const map = useMapStore((state) => state.map);
  const setMarkers = useMapStore((state) => state.setMarkers);
  useEffect(() => {
    setIsLoading(true);
    setUserLocation()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [setIsLoading, setUserLocation]);

  useEffect(() => {
    const newMarkers: Marker[] = [];
    removeMarkersFromMap();

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `<h6>${place.text_en}</h6><p>${place.place_name_en}</p>`
      );
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(map!);
      newMarkers.push(newMarker);
    }

    setMarkers(newMarkers);
  }, [places, setMarkers, map, removeMarkersFromMap]);

  return <>{children}</>;
};
