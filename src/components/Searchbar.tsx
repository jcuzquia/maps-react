import { ChangeEvent, useRef } from "react";
import { usePlacesStore } from "../stores";
import { SearchResults } from ".";

export const Searchbar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const places = usePlacesStore((state) => state.places);
  const setPlaces = usePlacesStore((state) => state.setPlaces);
  console.log(places);

  const searchPlacesByTerm = usePlacesStore(
    (state) => state.searchPlacesByTerm
  );
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const places = await searchPlacesByTerm(event.target.value);
      setPlaces(places);

      console.log(places);
    }, 350);
  };
  return (
    <div className="search-container">
      <input
        className="h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600 w-full"
        placeholder="Buscar Lugar..."
        onChange={onQueryChanged}
      />
      <SearchResults />
    </div>
  );
};
