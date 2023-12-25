import { usePlacesStore } from "../stores";
import { useMapStore } from "../stores/map/map.store";

export const BtnMyLocation = () => {
  const map = useMapStore((state) => state.map);
  const isMapReady = useMapStore((state) => state.isMapReady);
  const userLocation = usePlacesStore((state) => state.userLocation);

  const onClick = () => {
    if (!isMapReady) throw new Error("Mapa no esta listo");
    if (!userLocation) throw new Error("Mapa no esta listo");
    map?.flyTo({ zoom: 14, center: userLocation });
  };
  return (
    <button
      onClick={onClick}
      className="px-3 md:px-4 py-1 md:py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: "999" }}
    >
      My Ubicacion
    </button>
  );
};
