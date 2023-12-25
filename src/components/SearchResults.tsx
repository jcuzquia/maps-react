import { LoadingPlaces } from ".";
import { Feature } from "../interfaces";
import { usePlacesStore } from "../stores";
import { useMapStore } from "../stores/map/map.store";

export const SearchResults = () => {
  const places = usePlacesStore((state) => state.places);
  const userLocation = usePlacesStore((state) => state.userLocation);
  const isLoadingPlaces = usePlacesStore((state) => state.isLoadingPlaces);
  const map = useMapStore((state) => state.map);
  const getRouteBetweePoints = useMapStore(
    (state) => state.getRouteBetweenPoints
  );

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) {
      return;
    }
    const [lng, lat] = place.center;
    getRouteBetweePoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }
  if (places.length === 0) {
    return <></>;
  }
  return (
    <ul className="mt-3">
      {places.map((place) => (
        <li
          className="mb-2 cursor-pointer hover:bg-blue-700 hover:text-white"
          key={place.id}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text_en}</h6>
          <p style={{ fontSize: "12px" }}>{place.place_name}</p>
          <button onClick={() => getRoute(place)}>Direcciones</button>
        </li>
      ))}
    </ul>
  );
};
